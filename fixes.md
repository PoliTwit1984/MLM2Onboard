# Security Review: MLM2Onboard Application

**Date:** December 2, 2024
**Status:** Pre-Implementation Review
**Target Deployment:** Google Cloud Platform

---

## Executive Summary

A comprehensive security audit identified **20+ vulnerabilities** across the application. The primary risk was the exposure of sensitive user data (PII, subscription info, authentication keys) through an unauthenticated API endpoint.

**Decision:** Remove the Mixpanel profile lookup feature entirely and implement security hardening for Google Cloud deployment.

---

## Critical Findings (Resolved by Removal)

These issues are eliminated by removing the server-side Mixpanel profile lookup:

| ID | Issue | Severity | File | Resolution |
|----|-------|----------|------|------------|
| C1 | E6 Connect Key exposed to browser | CRITICAL | `server/routes.ts:138` | Remove endpoint |
| C2 | JQL injection vulnerability | CRITICAL | `server/routes.ts:62` | Remove endpoint |
| C3 | No authentication on profile API | CRITICAL | `server/routes.ts:29` | Remove endpoint |
| C4 | 18 PII fields exposed | HIGH | `server/routes.ts:119-139` | Remove endpoint |
| C5 | Email enumeration attack vector | HIGH | `server/routes.ts` | Remove endpoint |
| C6 | Error details leaked to client | HIGH | `server/routes.ts:150` | Remove endpoint |

---

## Remaining Issues (Require Implementation)

### HIGH Priority

| ID | Issue | File | Required Change |
|----|-------|------|-----------------|
| H1 | No security headers (CSP, HSTS, X-Frame-Options) | `server/index.ts` | Add `helmet.js` middleware |
| H2 | No CORS configuration | `server/index.ts` | Add `cors` middleware with whitelist |
| H3 | XSS via rehypeRaw in markdown | `client/src/pages/sections/TroubleshootingHub.tsx` | Remove `rehypeRaw` or sanitize HTML |
| H4 | No HTTPS enforcement | `server/index.ts` | Add HTTPS redirect for production |
| H5 | Error handler re-throws (causes crashes) | `server/index.ts:47` | Remove `throw err` statement |

### MEDIUM Priority

| ID | Issue | File | Required Change |
|----|-------|------|-----------------|
| M1 | No request body size limits | `server/index.ts` | Add `limit: '10kb'` to body parsers |
| M2 | `.env` files not in .gitignore | `.gitignore` | Add `.env*` patterns |
| M3 | Console logging in production | Multiple files | Guard with environment check |
| M4 | No client-side email validation | `client/src/pages/sections/HeroSection.tsx` | Add regex validation |
| M5 | Mixpanel localStorage persistence | `client/src/lib/mixpanel.ts` | Consider `persistence: 'cookie'` |

### LOW Priority

| ID | Issue | File | Required Change |
|----|-------|------|-----------------|
| L1 | External fonts from Google (privacy) | `client/index.html` | Consider self-hosting fonts |
| L2 | No API versioning | `server/routes.ts` | Use `/api/v1/` prefix for future routes |
| L3 | Source maps in production | `vite.config.ts` | Add `sourcemap: false` for prod build |

---

## Implementation Checklist

### Phase 1: Remove Mixpanel Profile Lookup

- [ ] **`server/routes.ts`** - Delete lines 5-158 (rate limiting + `/api/mixpanel/profile` endpoint)
- [ ] **`client/src/pages/sections/HeroSection.tsx`** - Complete rewrite:
  - [ ] Remove `UserProfile` interface
  - [ ] Remove `userProfile` state
  - [ ] Remove `fetch('/api/mixpanel/profile')` call
  - [ ] Remove profile card rendering (Account Info, Device Info, Subscription)
  - [ ] Remove "Welcome, [Name]!" personalized greeting
  - [ ] Make email input optional (remove `required` attribute)
  - [ ] On submit: call `identifyUser(email)` if email provided
  - [ ] Show "Thanks" card using shadcn Card component (see UI Pattern below)
- [ ] **Environment Variables** - Remove from deployment:
  - [ ] `MIXPANEL_PROJECT_ID`
  - [ ] `MIXPANEL_SERVICE_ACCOUNT_USERNAME`
  - [ ] `MIXPANEL_SERVICE_ACCOUNT_PASSWORD`

### Phase 2: Security Hardening

- [ ] **Install dependencies:**
  ```bash
  npm install helmet cors
  ```

- [ ] **`server/index.ts`** - Add security middleware:
  ```typescript
  import helmet from 'helmet';
  import cors from 'cors';

  // Trust proxy for GCP load balancer
  app.set('trust proxy', true);

  // Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.mxpnl.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        frameSrc: ["https://www.youtube.com"],
        connectSrc: ["'self'", "https://api.mixpanel.com", "https://api-js.mixpanel.com"],
      },
    },
    crossOriginEmbedderPolicy: false, // Allow YouTube embeds
  }));

  // CORS whitelist
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || false,
    credentials: true,
  }));

  // Request size limits
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: false, limit: '10kb' }));

  // HTTPS redirect in production
  if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https') {
        return res.redirect(`https://${req.header('host')}${req.url}`);
      }
      next();
    });
  }
  ```

- [ ] **`server/index.ts`** - Fix error handler (around line 42-48):
  ```typescript
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    console.error('Server error:', err.message);
    res.status(status).json({ error: 'An error occurred' });
    // REMOVE: throw err;
  });
  ```

### Phase 3: Fix XSS Vulnerability

- [ ] **`client/src/pages/sections/TroubleshootingHub.tsx`**:

  **Option A (Recommended):** Remove rehypeRaw entirely
  ```typescript
  // DELETE this import:
  // import rehypeRaw from "rehype-raw";

  // CHANGE ReactMarkdown usage:
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    // REMOVE: rehypePlugins={[rehypeRaw]}
  >
  ```
  Then create a separate `<VideoEmbed videoId="..." />` component for YouTube videos.

  **Option B:** Add HTML sanitization
  ```bash
  npm install dompurify @types/dompurify
  ```
  ```typescript
  import DOMPurify from 'dompurify';
  // Sanitize content before passing to ReactMarkdown
  const sanitizedContent = DOMPurify.sanitize(topic.content, {
    ALLOWED_TAGS: ['iframe', 'div', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'src', 'style', 'class', 'allowfullscreen', 'frameborder'],
  });
  ```

### Phase 4: Client-Side Improvements

- [ ] **`client/src/pages/sections/HeroSection.tsx`** - Email validation:
  ```typescript
  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  };
  ```

- [ ] **`.gitignore`** - Add environment file patterns:
  ```
  # Environment files
  .env
  .env.local
  .env.*.local
  .env.production
  .env.development
  ```

- [ ] **Remove/guard console statements** in:
  - `client/src/pages/sections/HeroSection.tsx`
  - `client/src/lib/mixpanel.ts`
  - `server/routes.ts` (if any remain after cleanup)

### Phase 5: Build Configuration

- [ ] **`vite.config.ts`** - Disable source maps in production:
  ```typescript
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
    // ... other options
  }
  ```

### Phase 6: Google Cloud Run Setup

- [ ] **Create `Dockerfile`** in project root (see Google Cloud Run Deployment section)
- [ ] **Create `.dockerignore`** in project root (see Google Cloud Run Deployment section)
- [ ] **Update port** in `server/index.ts` to default to 8080

### Phase 7: Production Infrastructure

#### 7.1 Health Check Endpoint

Cloud Run needs a health check endpoint to verify the container is running:

- [ ] **`server/routes.ts`** - Add health check endpoint:

  ```typescript
  // Health check for Cloud Run
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });
  ```

#### 7.2 Rate Limiting

Add proper rate limiting to prevent DoS attacks:

- [ ] **Install dependency:**

  ```bash
  npm install express-rate-limit
  ```

- [ ] **`server/index.ts`** - Add rate limiter:

  ```typescript
  import rateLimit from 'express-rate-limit';

  // Rate limiting - 100 requests per 15 minutes per IP
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Apply to all routes
  app.use(limiter);
  ```

#### 7.3 Graceful Shutdown

Handle container termination gracefully for Cloud Run:

- [ ] **`server/index.ts`** - Add shutdown handlers:

  ```typescript
  // Graceful shutdown for Cloud Run
  const shutdown = () => {
    console.log('Received shutdown signal, closing server...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      console.error('Forcing shutdown');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
  ```

#### 7.4 Structured Logging

Use structured JSON logging for Cloud Logging integration:

- [ ] **`server/index.ts`** - Add structured logger:

  ```typescript
  // Structured logging for Cloud Logging
  const log = (severity: 'INFO' | 'WARNING' | 'ERROR', message: string, meta?: object) => {
    const entry = {
      severity,
      message,
      timestamp: new Date().toISOString(),
      ...meta
    };
    console.log(JSON.stringify(entry));
  };

  // Usage examples:
  // log('INFO', 'Server started', { port });
  // log('ERROR', 'Request failed', { error: err.message, path: req.path });
  ```

- [ ] **Replace console.log/error** with structured log calls throughout server code

### Phase 8: Accessibility (a11y)

Ensure the app is usable by everyone, including those with disabilities:

- [ ] **`client/src/pages/sections/HeroSection.tsx`** - Form accessibility:

  ```typescript
  // Add aria-label to email input
  <Input
    type="email"
    placeholder="Enter your email address"
    aria-label="Email address for MLM2PRO onboarding"
    aria-describedby="email-help"
    // ... other props
  />
  <span id="email-help" className="sr-only">
    Optional. Enter your email to personalize your experience.
  </span>

  // Add aria-live for dynamic content
  {submitted && (
    <div aria-live="polite" aria-atomic="true">
      <Card>...</Card>
    </div>
  )}

  // Ensure button has descriptive text
  <Button type="submit" aria-label="Submit email and start onboarding">
    GET STARTED
  </Button>
  ```

- [ ] **Focus management** - After form submission, move focus to the Thanks card:

  ```typescript
  const thanksCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted && thanksCardRef.current) {
      thanksCardRef.current.focus();
    }
  }, [submitted]);

  // On the card:
  <Card ref={thanksCardRef} tabIndex={-1}>
  ```

- [ ] **Color contrast** - Ensure text meets WCAG AA standards (4.5:1 ratio)
- [ ] **Keyboard navigation** - All interactive elements must be keyboard accessible
- [ ] **Screen reader testing** - Test with VoiceOver (Mac) or NVDA (Windows)

### Phase 9: Error Tracking (Optional - Recommended)

Add Sentry for production error monitoring:

- [ ] **Install Sentry:**

  ```bash
  npm install @sentry/node @sentry/react
  ```

- [ ] **`server/index.ts`** - Initialize Sentry (server):

  ```typescript
  import * as Sentry from '@sentry/node';

  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: 'production',
      tracesSampleRate: 0.1, // 10% of requests
    });
  }

  // Add Sentry error handler AFTER all routes
  app.use(Sentry.Handlers.errorHandler());
  ```

- [ ] **`client/src/main.tsx`** - Initialize Sentry (client):

  ```typescript
  import * as Sentry from '@sentry/react';

  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: 'production',
      tracesSampleRate: 0.1,
    });
  }
  ```

- [ ] **Environment variable:** Add `SENTRY_DSN` and `VITE_SENTRY_DSN` to deployment

### Phase 10: Image Optimization

Optimize images for faster loading:

- [ ] **Convert MLM2PRO device image to WebP format:**

  ```bash
  # Using cwebp (install: brew install webp)
  cwebp -q 80 attached_assets/mlm2pro-device.png -o public/mlm2pro-device.webp
  ```

- [ ] **Add responsive image with fallback:**

  ```typescript
  <picture>
    <source
      srcSet="/mlm2pro-device.webp"
      type="image/webp"
    />
    <img
      src="/figmaAssets/mlm2pro-device.png"
      alt="MLM2PRO Launch Monitor"
      loading="lazy"
      className="w-full h-auto object-contain"
    />
  </picture>
  ```

- [ ] **Add multiple sizes for responsive loading:**

  ```typescript
  <img
    src="/mlm2pro-device-800.webp"
    srcSet="
      /mlm2pro-device-400.webp 400w,
      /mlm2pro-device-800.webp 800w,
      /mlm2pro-device-1200.webp 1200w
    "
    sizes="(max-width: 768px) 100vw, 800px"
    alt="MLM2PRO Launch Monitor"
    loading="lazy"
  />
  ```

- [ ] **Lazy load below-fold images:**

  ```typescript
  // Already using loading="lazy" but ensure all images have it
  <img loading="lazy" ... />
  ```

---

## UI Pattern: Thanks Card Component

Following the shadcn/ui `SectionCard` pattern from `ui_guidelines.md`, the "Thanks" card should use the existing Card component for consistent styling.

### Responsive Design Requirements

The current HeroSection has responsive issues that must be fixed:

| Issue | Current | Fix |
|-------|---------|-----|
| Headline font | `text-[67px]` (fixed) | `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` |
| Section padding | `pl-[41px] pr-[41px]` (fixed) | `px-4 sm:px-6 md:px-8 lg:px-12` |
| Card padding | `p-8` (fixed) | `p-4 sm:p-6 md:p-8` |
| CSS variables | `text-[length:var(...)]` (fixed px) | Use Tailwind responsive classes |

### Tailwind Breakpoints Reference

| Prefix | Min Width | Target Device |
|--------|-----------|---------------|
| (none) | 0px | Mobile phones |
| `sm:` | 640px | Large phones / small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops / small desktops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large desktops |

### Responsive Thanks Card Implementation

```typescript
// In HeroSection.tsx - after successful submission
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

// Main section wrapper - RESPONSIVE padding
<section className="relative w-full min-h-screen bg-genericblack flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">

  {/* Headline - RESPONSIVE font sizes */}
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-genericwhite text-center">
    Your Quest To More Golf Starts Here
  </h1>

  {/* Thanks Card - RESPONSIVE sizing */}
  {submitted && (
    <Card className="w-full max-w-sm sm:max-w-md mx-auto">
      <CardHeader className="text-center p-4 sm:p-6">
        <div className="flex justify-center mb-2 sm:mb-4">
          <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500" />
        </div>
        <CardTitle className="text-xl sm:text-2xl">You're All Set!</CardTitle>
      </CardHeader>
      <CardContent className="text-center p-4 sm:p-6 pt-0 sm:pt-0">
        <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
          Thanks for joining. You're ready to start your MLM2PRO journey.
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Scroll down to explore setup guides, swing metrics, and troubleshooting tips.
        </p>
      </CardContent>
    </Card>
  )}

  {/* Email form - RESPONSIVE layout (already has sm:flex-row) */}
  <form className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md">
    ...
  </form>
</section>
```

### Key Responsive Principles

- **Mobile-first**: Start with mobile styles, add breakpoint prefixes for larger screens
- **Use Tailwind classes**: Avoid CSS variable font sizes that don't scale
- **No magic numbers**: Use spacing scale (`p-4`, `p-6`) not `p-[41px]`
- **Test all breakpoints**: Phone (320-480px), Tablet (768px), Desktop (1024px+)
- **Touch targets**: Buttons should be at least 44x44px on mobile

### Testing Checklist

- [ ] Test on iPhone SE (375px width)
- [ ] Test on iPhone 14 Pro (393px width)
- [ ] Test on iPad (768px width)
- [ ] Test on iPad Pro (1024px width)
- [ ] Test on Desktop (1280px+ width)
- [ ] Test landscape orientations
- [ ] Verify text is readable without zooming
- [ ] Verify buttons are tappable on touch devices

---

## Environment Variables (Final State)

### Required for Production

| Variable | Purpose | Where Used |
|----------|---------|------------|
| `VITE_MIXPANEL_PROJECT_TOKEN` | Client-side Mixpanel tracking | `client/src/lib/mixpanel.ts` |
| `ALLOWED_ORIGINS` | CORS whitelist (comma-separated) | `server/index.ts` |
| `NODE_ENV` | Set to `production` | Multiple |
| `PORT` | Server port (default: 8080 for Cloud Run) | `server/index.ts` |

### Optional (Recommended)

| Variable | Purpose | Where Used |
|----------|---------|------------|
| `SENTRY_DSN` | Server-side error tracking | `server/index.ts` |
| `VITE_SENTRY_DSN` | Client-side error tracking | `client/src/main.tsx` |

### No Longer Required (Remove)

| Variable | Reason |
|----------|--------|
| `MIXPANEL_PROJECT_ID` | Server-side lookup removed |
| `MIXPANEL_SERVICE_ACCOUNT_USERNAME` | Server-side lookup removed |
| `MIXPANEL_SERVICE_ACCOUNT_PASSWORD` | Server-side lookup removed |
| `DATABASE_URL` | Database not actively used |

---

## Google Cloud Run Deployment

### Required Files to Create

#### Dockerfile (create in project root)

```dockerfile
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application
COPY dist ./dist
COPY client/dist ./client/dist

# Cloud Run uses PORT env var (default 8080)
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["node", "dist/index.js"]
```

#### .dockerignore (create in project root)

```text
node_modules
.git
.gitignore
*.md
.env
.env.*
.DS_Store
src
client/src
server
shared
*.ts
*.tsx
tsconfig*.json
vite.config.ts
drizzle.config.ts
tailwind.config.ts
postcss.config.js
components.json
attached_assets
```

### Port Configuration

Update `server/index.ts` to use port 8080 (Cloud Run default):

```typescript
// Cloud Run sets PORT env var, default to 8080
const port = parseInt(process.env.PORT || '8080');
```

### Build Script Update

Update `package.json` build script to ensure client assets are ready:

```json
{
  "scripts": {
    "build": "vite build && esbuild server/index.ts --bundle --platform=node --outdir=dist --format=esm --packages=external"
  }
}
```

### Deployment Commands

```bash
# First-time setup
gcloud config set project YOUR_PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# Build and deploy
gcloud run deploy mlm2-onboard \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NODE_ENV=production,ALLOWED_ORIGINS=https://your-domain.com" \
  --memory 512Mi \
  --timeout 60

# Update environment variables only
gcloud run services update mlm2-onboard \
  --region us-central1 \
  --set-env-vars "ALLOWED_ORIGINS=https://your-domain.com"

# View logs
gcloud run logs read mlm2-onboard --region us-central1
```

### Required GCP Configuration

1. **HTTPS/SSL:** Cloud Run provides automatic HTTPS with managed certificates
2. **Environment Variables:** Set via `--set-env-vars` or GCP Console > Cloud Run > Variables
3. **CORS Origins:** Set `ALLOWED_ORIGINS=https://your-domain.com`
4. **Trust Proxy:** Already configured in code with `app.set('trust proxy', true)`

### Security Headers Verification

After deployment, verify headers at: https://securityheaders.com

Expected grades:
- Content-Security-Policy: A
- X-Frame-Options: A (DENY)
- X-Content-Type-Options: A (nosniff)
- Strict-Transport-Security: A (with HTTPS)

---

## Files Modified Summary

| File | Action | Priority |
|------|--------|----------|
| `server/routes.ts` | Remove Mixpanel endpoint, add health check | HIGH |
| `server/index.ts` | Security middleware, rate limiting, graceful shutdown, structured logging | HIGH |
| `client/src/pages/sections/HeroSection.tsx` | Major rewrite - responsive Thanks card with a11y | HIGH |
| `client/src/pages/sections/TroubleshootingHub.tsx` | Remove rehypeRaw for XSS fix | HIGH |
| `Dockerfile` | **CREATE** - Node.js container for Cloud Run | HIGH |
| `.dockerignore` | **CREATE** - Exclude dev files from container | HIGH |
| `.gitignore` | Add .env patterns | MEDIUM |
| `package.json` | Add helmet, cors, express-rate-limit, @sentry/* deps | MEDIUM |
| `vite.config.ts` | Disable prod source maps | MEDIUM |
| `client/src/main.tsx` | Add Sentry initialization (optional) | LOW |
| `attached_assets/` | Optimize images to WebP format | LOW |

### New Dependencies to Install

```bash
npm install helmet cors express-rate-limit
npm install @sentry/node @sentry/react  # Optional but recommended
```

---

## Testing Requirements

### Security Tests

- [ ] Verify no PII returned from any endpoint
- [ ] Confirm CORS blocks requests from unauthorized origins
- [ ] Test CSP blocks inline scripts from unauthorized sources
- [ ] Verify HTTPS redirect works in production
- [ ] Check no sensitive data in browser console/network tab
- [ ] Confirm error responses don't leak stack traces
- [ ] Test rate limiting blocks excessive requests (>100 in 15 min)

### Functional Tests

- [ ] Email submission works (with email entered)
- [ ] Email submission works (without email - anonymous)
- [ ] "Thanks" card displays after submission
- [ ] Mixpanel tracks anonymous users
- [ ] Mixpanel identifies users when email provided
- [ ] YouTube embeds work in troubleshooting section
- [ ] All existing educational content renders correctly

### Infrastructure Tests

- [ ] Health check endpoint returns 200 OK (`/health`)
- [ ] Graceful shutdown works (container receives SIGTERM, closes cleanly)
- [ ] Structured logs appear correctly in Cloud Logging
- [ ] Sentry captures and reports errors (if configured)

### Accessibility Tests

- [ ] Tab through all interactive elements in order
- [ ] Screen reader announces form labels correctly
- [ ] Screen reader announces "Thanks" card when it appears
- [ ] Focus moves to Thanks card after submission
- [ ] All text meets WCAG AA color contrast (4.5:1)
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)

### Performance Tests

- [ ] Images load in WebP format on supported browsers
- [ ] Lazy loading works for below-fold images
- [ ] Page loads under 3 seconds on 3G connection
- [ ] Lighthouse performance score > 80

---

## Compliance Notes

### GDPR/CCPA Considerations

- **Before:** Exposed 18+ PII fields without consent mechanism
- **After:** Only collect email (optional) with implicit consent via form submission
- **Recommendation:** Add privacy policy link near email input

### Data Retention

- Mixpanel data retention configured in Mixpanel dashboard
- No server-side data storage (MemStorage is in-memory, not persisted)
- Consider adding data deletion request process for compliance

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Security Review | | | |
| Product Owner | | | |
