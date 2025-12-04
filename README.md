# MLM2PRO Onboarding Platform

A modern product landing page and onboarding application for the Rapsodo MLM2PRO golf launch monitor. Built with React, Express, and TypeScript, deployed on Google Cloud Run.

## Features

- **Interactive Landing Page** - Engaging hero section, app screenshots carousel, and metrics showcase
- **Troubleshooting Hub** - Searchable help content with embedded video tutorials
- **User Onboarding** - Email capture and guided setup flow
- **Analytics** - Comprehensive Mixpanel tracking for user engagement
- **Error Monitoring** - Sentry integration for production reliability

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| UI Components | shadcn/ui (Radix primitives) |
| Backend | Express.js, Node.js 20 |
| Database | Drizzle ORM + Neon PostgreSQL (ready) |
| Analytics | Mixpanel |
| Error Tracking | Sentry |
| Deployment | Google Cloud Run |

## Quick Start

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/MLM2Onboard.git
cd MLM2Onboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`

### Environment Variables

Create a `.env` file in the project root:

```env
# Analytics (Mixpanel)
VITE_MIXPANEL_PROJECT_TOKEN=your_mixpanel_token

# Error Tracking (Sentry)
VITE_SENTRY_DSN=your_sentry_dsn
SENTRY_DSN=your_sentry_dsn

# Fonts (optional Adobe Fonts kit for Acumin)
VITE_ADOBE_FONTS_KIT_ID=your_typekit_kit_id

# Environment
NODE_ENV=development
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Run production server |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push database schema changes |

## Project Structure

```
MLM2Onboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Page components
│   │   │   └── sections/   # Landing page sections
│   │   ├── lib/            # Utilities and analytics
│   │   └── hooks/          # Custom React hooks
│   └── index.html
├── server/                 # Express backend
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   └── static.ts           # Static file serving
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema (Drizzle)
├── guidelines/             # Documentation
│   └── GOOGLE_CLOUD.md     # Deployment guide
└── attached_assets/        # Static images
```

## Deployment

### Google Cloud Run

The application is configured for Google Cloud Run deployment with a multi-stage Dockerfile.

```bash
# Deploy to Cloud Run
gcloud run deploy mlm2-onboard \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-build-env-vars "VITE_MIXPANEL_PROJECT_TOKEN=xxx,VITE_SENTRY_DSN=yyy,VITE_ADOBE_FONTS_KIT_ID=kit123" \
  --set-env-vars "NODE_ENV=production,SENTRY_DSN=yyy"
```

See [guidelines/GOOGLE_CLOUD.md](guidelines/GOOGLE_CLOUD.md) for comprehensive deployment documentation.

## Security

- **Helmet.js** - Security headers and CSP
- **Rate Limiting** - 100 requests/15 min per IP (production)
- **HTTPS Redirect** - Automatic in production
- **CORS** - Whitelist-based origin validation

## Analytics Events

The application tracks user engagement through Mixpanel:

- Page views and section visibility
- Email submissions
- Troubleshooting hub searches and topic expansions
- Click heatmaps and scroll depth

See [mixpanel.md](mixpanel.md) for detailed analytics documentation.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
