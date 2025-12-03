# Google Cloud Deployment Guide for Node.js/Express + Vite

This project uses **Express.js** for the server, **Vite + React** for the client, and deploys to **Google Cloud Run**.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Dockerfile Configuration](#dockerfile-configuration)
4. [Vite + Express Development vs Production](#vite--express-development-vs-production)
5. [Environment Variables](#environment-variables)
6. [Security Configuration](#security-configuration)
7. [Mixpanel Analytics](#mixpanel-analytics)
8. [Sentry Error Tracking](#sentry-error-tracking)
9. [Deployment Commands](#deployment-commands)
10. [Common Issues & Solutions](#common-issues--solutions)

---

## Architecture Overview

- **Compute**: Google Cloud Run (containerized, serverless)
- **Frontend**: Vite + React (compiled to static assets)
- **Backend**: Express.js (serves API + static files)
- **Analytics**: Mixpanel
- **Error Tracking**: Sentry
- **Region**: us-central1

---

## Project Structure

```
project/
├── client/
│   ├── src/
│   │   ├── lib/
│   │   │   └── mixpanel.ts      # Analytics tracking
│   │   └── ...
│   └── index.html
├── server/
│   ├── index.ts                  # Main server entry
│   ├── routes.ts                 # API routes
│   ├── static.ts                 # Production static file serving (NO vite imports!)
│   ├── vite.ts                   # Development-only Vite setup
│   └── vite-dev.ts               # Vite dev server (only used in development)
├── shared/                       # Shared types/utilities
├── dist/                         # Built output (gitignored)
│   ├── index.js                  # Compiled server
│   └── public/                   # Compiled client assets
├── Dockerfile
├── .dockerignore
├── .env                          # Local environment (gitignored)
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Dockerfile Configuration

### Key Principles

1. **Multi-stage builds** - Separate build and production stages
2. **No BuildKit features** - Cloud Build doesn't support `--mount=type=cache`
3. **Build args for Vite** - VITE_* variables must be available at build time
4. **Production dependencies only** - Use `npm install --omit=dev` in production stage

### Working Dockerfile

```dockerfile
# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev) for building
RUN npm install

# Copy source code
COPY . .

# Set Vite environment variables for build (baked into client bundle)
ARG VITE_MIXPANEL_PROJECT_TOKEN
ARG VITE_SENTRY_DSN
ENV VITE_MIXPANEL_PROJECT_TOKEN=$VITE_MIXPANEL_PROJECT_TOKEN
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Cloud Run uses PORT env var (default 8080)
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

# Start the server
CMD ["node", "dist/index.js"]
```

### .dockerignore

Keep this minimal to ensure source files are available for the build:

```
# Dependencies (will be installed fresh)
node_modules

# Git
.git
.gitignore

# Documentation
*.md
docs

# Environment files (will be set via Cloud Run)
.env
.env.*

# OS files
.DS_Store

# IDE
.vscode
.idea

# Testing
coverage
*.test.ts
*.spec.ts

# Build output (will be regenerated)
dist

# Misc
attached_assets
```

### Common Dockerfile Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| `RUN --mount=type=cache` | Cloud Build doesn't support BuildKit | Remove cache mounts |
| `npm ci` without lock file | Fails if package-lock.json not copied | Use `npm install` instead |
| `npm ci --only=production` | Old npm syntax | Use `npm install --omit=dev` |
| Ignoring source files | Can't build without them | Keep `.ts` files in container |
| Missing ARG before ENV | Build args not available | Declare `ARG` then `ENV` |

---

## Vite + Express Development vs Production

### The Problem

Vite is a **dev dependency** and must NOT be imported in production. However, standard imports will cause Node.js to try loading Vite even if the code path isn't executed.

### The Solution

**Separate static file serving from Vite setup:**

1. Create `server/static.ts` - Production-only, NO vite imports:

```typescript
// server/static.ts - PRODUCTION SAFE
import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(`Could not find the build directory: ${distPath}`);
  }

  app.use(express.static(distPath));

  // SPA fallback
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
```

2. Create `server/vite.ts` - Development-only wrapper:

```typescript
// server/vite.ts - DEVELOPMENT ONLY
import { type Express } from "express";
import { type Server } from "http";

export async function setupVite(app: Express, server: Server) {
  const { setupViteDev } = await import("./vite-dev.js");
  await setupViteDev(app, server);
}
```

3. Use **dynamic import** in `server/index.ts`:

```typescript
// server/index.ts
import { serveStatic, log } from "./static";  // Safe import

// ... app setup ...

if (app.get("env") === "development") {
  // Dynamic import - only loaded in development
  const { setupVite } = await import("./vite.js");
  await setupVite(app, server);
} else {
  serveStatic(app);
}
```

4. Exclude vite.js from esbuild bundle in `package.json`:

```json
{
  "scripts": {
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --external:./vite.js"
  }
}
```

### Why This Works

- `static.ts` has NO vite imports → safe to bundle for production
- `vite.ts` is excluded via `--external:./vite.js`
- Dynamic `import()` is only executed in development
- Production bundle never tries to load vite

---

## Environment Variables

### Types of Environment Variables

| Type | When Available | Where Set | Example |
|------|----------------|-----------|---------|
| `VITE_*` | Build time (client) | Dockerfile ARG/ENV | `VITE_MIXPANEL_PROJECT_TOKEN` |
| Runtime | Container start | Cloud Run env vars | `SENTRY_DSN`, `NODE_ENV` |

### Vite Environment Variables

Vite requires `VITE_` prefixed variables at **build time**. They get baked into the JavaScript bundle.

**vite.config.ts:**
```typescript
export default defineConfig({
  root: path.resolve(import.meta.dirname, "client"),
  envDir: path.resolve(import.meta.dirname), // Load .env from project root
  // ...
});
```

**Dockerfile:**
```dockerfile
ARG VITE_MIXPANEL_PROJECT_TOKEN
ARG VITE_SENTRY_DSN
ENV VITE_MIXPANEL_PROJECT_TOKEN=$VITE_MIXPANEL_PROJECT_TOKEN
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN

RUN npm run build
```

**Deploy command:**
```bash
gcloud run deploy SERVICE_NAME \
  --set-build-env-vars "VITE_MIXPANEL_PROJECT_TOKEN=xxx,VITE_SENTRY_DSN=yyy" \
  --set-env-vars "NODE_ENV=production,SENTRY_DSN=yyy"
```

### Local Development (.env)

```
# Client-side (baked into bundle)
VITE_MIXPANEL_PROJECT_TOKEN=your_token_here
VITE_SENTRY_DSN=https://xxx@sentry.io/yyy

# Server-side
SENTRY_DSN=https://xxx@sentry.io/yyy
NODE_ENV=development
```

---

## Security Configuration

### Helmet (Security Headers)

```typescript
import helmet from "helmet";

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",  // Required for Vite in dev
          "https://cdn.mxpnl.com",  // Mixpanel
          "https://www.youtube.com",
          "https://s.ytimg.com"
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        frameSrc: ["https://www.youtube.com", "https://www.youtube-nocookie.com"],
        connectSrc: [
          "'self'",
          "https://api.mixpanel.com",
          "https://api-js.mixpanel.com"
        ],
      },
    },
    crossOriginEmbedderPolicy: false,  // Allow YouTube embeds
  })
);
```

### Rate Limiting (Production Only)

```typescript
import rateLimit from "express-rate-limit";

if (process.env.NODE_ENV === "production") {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,                   // 100 requests per window per IP
    message: { error: "Too many requests, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
}
```

### CORS

```typescript
import cors from "cors";

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || false,
    credentials: true,
  })
);
```

### Trust Proxy (Required for Cloud Run)

```typescript
app.set("trust proxy", true);
```

### HTTPS Redirect

```typescript
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      return res.redirect(`https://${req.header("host")}${req.url}`);
    }
    next();
  });
}
```

---

## Mixpanel Analytics

### Setup (`client/src/lib/mixpanel.ts`)

```typescript
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN || '';

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: import.meta.env.DEV,
    track_pageview: true,
    persistence: 'localStorage',
  });
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!MIXPANEL_TOKEN) {
    if (import.meta.env.DEV) console.log('[Mixpanel]', eventName, properties);
    return;
  }
  mixpanel.track(eventName, properties);
};

export const identifyUser = (email: string) => {
  if (!MIXPANEL_TOKEN) return;
  mixpanel.identify(email);
  mixpanel.people.set({
    $email: email,
    $last_login: new Date().toISOString(),
  });
};
```

### Tracking Functions

```typescript
// Section visibility
export const trackSectionView = (sectionId: string, sectionName: string) => {
  trackEvent('section_viewed', { section_id: sectionId, section_name: sectionName });
};

// Specific element clicks
export const trackMetricClicked = (metricName: string, metricId: string) => {
  trackEvent('metric_clicked', { metric_name: metricName, metric_id: metricId });
};

// Global click tracking (for heatmaps)
export const trackClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  trackEvent('click', {
    element_tag: target.tagName.toLowerCase(),
    element_text: target.textContent?.slice(0, 50) || '',
    x: event.clientX,
    y: event.clientY,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
  });
};
```

### React Hooks

```typescript
// Track section visibility with IntersectionObserver
export const useSectionTracking = (sectionId: string, sectionName: string) => {
  const ref = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          trackSectionView(sectionId, sectionName);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [sectionId, sectionName]);

  return ref;
};

// Global click tracking
export const useClickTracking = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => trackClick(event);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};
```

### Querying Mixpanel Data (API)

```bash
# Export events
curl -u "API_SECRET:" \
  "https://data.mixpanel.com/api/2.0/export?from_date=2025-12-02&to_date=2025-12-03"

# Filter specific events
curl -s -u "API_SECRET:" "https://data.mixpanel.com/api/2.0/export?from_date=2025-12-02&to_date=2025-12-03" | \
  python3 -c "import sys,json; [print(json.loads(l)) for l in sys.stdin if 'metric_clicked' in l]"
```

---

## Sentry Error Tracking

### Server Setup

```typescript
import * as Sentry from "@sentry/node";

if (process.env.NODE_ENV === "production" && process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: "production",
    tracesSampleRate: 0.1,
  });
}

// Add error handler BEFORE custom error handler
if (process.env.NODE_ENV === "production" && process.env.SENTRY_DSN) {
  Sentry.setupExpressErrorHandler(app);
}
```

### Client Setup

```typescript
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: "production",
    tracesSampleRate: 0.1,
  });
}
```

---

## Deployment Commands

### First-time Setup

```bash
# Set project
gcloud config set project PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

### Deploy

```bash
gcloud run deploy mlm2-onboard \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars "NODE_ENV=production,SENTRY_DSN=https://xxx@sentry.io/yyy" \
  --set-build-env-vars "VITE_MIXPANEL_PROJECT_TOKEN=xxx,VITE_SENTRY_DSN=https://xxx@sentry.io/yyy" \
  --memory 512Mi \
  --timeout 300
```

### View Logs

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=SERVICE_NAME" \
  --limit=50 --format="value(textPayload)"
```

---

## Common Issues & Solutions

### Container Failed to Start

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot find package 'vite'` | Vite imported in production | Separate static.ts from vite.ts, use dynamic imports |
| `ERR_MODULE_NOT_FOUND` | Missing dependency | Check `--external` flags in esbuild |
| `ENOTSUP socket 0.0.0.0` | Host binding issue on macOS | Use `localhost` for dev, `0.0.0.0` for prod |

### Build Failures

| Error | Cause | Solution |
|-------|-------|----------|
| `--mount option requires BuildKit` | Cloud Build doesn't support BuildKit | Remove `--mount=type=cache` |
| `npm ci` fails | No package-lock.json | Use `npm install` instead |
| Missing VITE_* variables | Not set at build time | Use `--set-build-env-vars` |

### YouTube Embed Errors (Error 153)

1. **Use `youtube-nocookie.com`** instead of `youtube.com`:
   ```html
   <!-- BAD -->
   src="https://www.youtube.com/embed/VIDEO_ID"

   <!-- GOOD -->
   src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
   ```
2. Remove `?si=` tracking parameters from embed URLs
3. Remove `referrerpolicy` attribute from iframes
4. Add YouTube domains to CSP `frameSrc` and `childSrc`:
   ```typescript
   frameSrc: ["https://www.youtube.com", "https://www.youtube-nocookie.com"],
   ```

### Rate Limiting in Development

Make rate limiting production-only:
```typescript
if (process.env.NODE_ENV === "production") {
  app.use(limiter);
}
```

### Mixpanel Not Sending Data

1. Check if token is loaded: Look for `[Mixpanel]` prefix in console (fallback logging)
2. Verify `envDir` in vite.config.ts points to project root
3. Check CSP allows `api.mixpanel.com` and `api-js.mixpanel.com`

### Graceful Shutdown

```typescript
const shutdown = () => {
  log("Received shutdown signal");
  server.close(() => {
    log("Server closed");
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000);  // Force after 10s
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
```

---

## Advanced: Cloud Build Configuration (cloudbuild.yaml)

Instead of `gcloud run deploy --source .` (which auto-generates a build config), you can create a `cloudbuild.yaml` for explicit control over the build process.

### Why Use cloudbuild.yaml?

| Feature | `--source .` (Auto) | `cloudbuild.yaml` |
|---------|---------------------|-------------------|
| BuildKit features | ❌ Not supported | ❌ Not supported |
| Layer caching | ❌ No | ✅ Yes (with Kaniko) |
| Multi-step pipelines | ❌ No | ✅ Yes |
| Custom build args | Limited | ✅ Full control |
| Parallel steps | ❌ No | ✅ Yes |

### Cloud Build Limitations (Important!)

**Cloud Build does NOT support BuildKit.** This means:
- ❌ `RUN --mount=type=cache` will fail
- ❌ `RUN --mount=type=secret` will fail
- ❌ BuildKit-specific syntax won't work

**Solution:** Use **Kaniko** instead of Docker for builds that need caching.

### Basic cloudbuild.yaml with Docker

```yaml
# cloudbuild.yaml - Basic Docker build
steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - '${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_IMAGE}:$COMMIT_SHA'
      - '--build-arg'
      - 'VITE_MIXPANEL_PROJECT_TOKEN=${_VITE_MIXPANEL_TOKEN}'
      - '--build-arg'
      - 'VITE_SENTRY_DSN=${_VITE_SENTRY_DSN}'
      - '.'

  # Push to Artifact Registry
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - '${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_IMAGE}:$COMMIT_SHA'

  # Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - '${_SERVICE}'
      - '--image'
      - '${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_IMAGE}:$COMMIT_SHA'
      - '--region'
      - '${_REGION}'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
      - '--set-env-vars'
      - 'NODE_ENV=production,SENTRY_DSN=${_SENTRY_DSN}'

# Store the image in Artifact Registry
images:
  - '${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_IMAGE}:$COMMIT_SHA'

# Substitution variables (can be overridden at build time)
substitutions:
  _REGION: us-central1
  _REPO: my-repo
  _IMAGE: mlm2-onboard
  _SERVICE: mlm2-onboard
  _VITE_MIXPANEL_TOKEN: ''
  _VITE_SENTRY_DSN: ''
  _SENTRY_DSN: ''

options:
  logging: CLOUD_LOGGING_ONLY
```

### Kaniko for Faster Builds (Layer Caching)

Kaniko caches Docker layers to speed up subsequent builds. Replace `gcr.io/cloud-builders/docker` with `gcr.io/kaniko-project/executor`.

```yaml
# cloudbuild.yaml - Kaniko with caching
steps:
  # Build with Kaniko (includes push automatically)
  - name: 'gcr.io/kaniko-project/executor:latest'
    args:
      - '--dockerfile=Dockerfile'
      - '--context=dir://.'
      - '--destination=${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_IMAGE}:$COMMIT_SHA'
      - '--cache=true'
      - '--cache-ttl=168h'  # 7 days
      - '--build-arg=VITE_MIXPANEL_PROJECT_TOKEN=${_VITE_MIXPANEL_TOKEN}'
      - '--build-arg=VITE_SENTRY_DSN=${_VITE_SENTRY_DSN}'

  # Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - '${_SERVICE}'
      - '--image'
      - '${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_IMAGE}:$COMMIT_SHA'
      - '--region'
      - '${_REGION}'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'

substitutions:
  _REGION: us-central1
  _REPO: my-repo
  _IMAGE: mlm2-onboard
  _SERVICE: mlm2-onboard
  _VITE_MIXPANEL_TOKEN: ''
  _VITE_SENTRY_DSN: ''
```

### Dockerfile Best Practices for Caching

Order your Dockerfile to maximize cache hits:

```dockerfile
# 1. Base image (rarely changes) - CACHED
FROM node:20-slim AS builder
WORKDIR /app

# 2. Package files (change occasionally) - CACHED if unchanged
COPY package*.json ./

# 3. Install dependencies (slow, cache if package.json unchanged) - CACHED
RUN npm install

# 4. Source code (changes frequently) - NOT CACHED
COPY . .

# 5. Build (runs every time source changes)
ARG VITE_MIXPANEL_PROJECT_TOKEN
ARG VITE_SENTRY_DSN
RUN npm run build
```

### Kaniko Cache TTL Guidelines

| Scenario | TTL | Reasoning |
|----------|-----|-----------|
| Stable dependencies | `--cache-ttl=168h` (7 days) | Dependencies don't change often |
| Active development | `--cache-ttl=24h` (1 day) | Balance speed vs. freshness |
| Security-sensitive | `--cache-ttl=6h` | Frequent dependency updates |

### Running Builds

```bash
# Submit build with substitutions
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_VITE_MIXPANEL_TOKEN="xxx",_VITE_SENTRY_DSN="yyy",_SENTRY_DSN="yyy"

# Or enable Kaniko globally for simple builds
gcloud config set builds/use_kaniko True
gcloud builds submit --tag gcr.io/$PROJECT_ID/myimage
```

### Setting Up Artifact Registry (Required for Kaniko)

```bash
# Create repository
gcloud artifacts repositories create my-repo \
  --repository-format=docker \
  --location=us-central1 \
  --description="Docker images"

# Grant Cloud Build access
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
  --role=roles/artifactregistry.writer
```

### Comparison: Simple Deploy vs cloudbuild.yaml

**Simple (what we used):**
```bash
gcloud run deploy mlm2-onboard --source . --set-build-env-vars "..."
```
- ✅ One command
- ✅ No config file needed
- ❌ No layer caching
- ❌ Slower rebuilds

**cloudbuild.yaml + Kaniko:**
```bash
gcloud builds submit --config=cloudbuild.yaml --substitutions=...
```
- ✅ Layer caching (faster rebuilds)
- ✅ Full control over build process
- ✅ Can add tests, security scans, etc.
- ❌ More setup required

**Recommendation:** Start with `--source .` for simplicity. Switch to `cloudbuild.yaml` + Kaniko when build times become a pain point.

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# App runs at http://localhost:5000

# Build for production (test locally)
npm run build
npm run start
```

---

## Cost Optimization

- Cloud Run scales to zero when idle
- Use `--memory 512Mi` for simple apps
- Set `--max-instances` to limit scaling
- Use `--min-instances 0` (default) for cost savings
