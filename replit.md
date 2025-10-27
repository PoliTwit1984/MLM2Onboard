# Overview

This is a full-stack web application built with React and Express, featuring a product landing page for what appears to be a sports technology company (focused on golf, baseball, and softball launch monitors). The application uses a modern tech stack with TypeScript, Vite for the frontend build process, and includes a comprehensive UI component library based on shadcn/ui with Radix UI primitives.

The application is structured as a monorepo with separate client and server directories, sharing common code through a shared schema directory. It's designed to be deployed on Replit with development-specific tooling and optimizations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query v5 for server state management and data fetching

**UI Framework:**
- shadcn/ui component library (New York style variant) with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Custom CSS variables for theming (including brand colors, typography scales)
- Component-based architecture with reusable UI primitives

**Styling Approach:**
- Utility-first CSS with Tailwind
- CSS variables for design system consistency
- Custom font families including Acumin Pro, Barlow, and others
- Responsive design with mobile-first breakpoints

**Rationale:** This stack provides excellent developer experience with fast refresh, type safety, and a comprehensive component library that accelerates UI development while maintaining consistency.

## Backend Architecture

**Server Framework:**
- Express.js as the HTTP server
- ESM (ES Modules) for modern JavaScript imports
- TypeScript for type safety across the stack

**Development Setup:**
- Vite middleware mode for seamless development experience
- Custom logging middleware for API request tracking
- Error handling middleware for consistent error responses
- Development-only Replit plugins (cartographer, dev banner, runtime error overlay)

**Storage Layer:**
- In-memory storage implementation (`MemStorage`) for development
- Storage interface (`IStorage`) designed for easy swapping to persistent storage
- Current implementation includes basic user CRUD operations

**Rationale:** Express provides a minimalist, flexible foundation. The in-memory storage is a placeholder that can be easily replaced with a database implementation through the defined interface pattern, maintaining clean separation of concerns.

## Data Layer

**Database Schema (Prepared but not actively used):**
- Drizzle ORM configured for PostgreSQL
- Schema defined in `shared/schema.ts` with Zod validation
- Users table with UUID primary keys and unique username constraints
- Neon serverless PostgreSQL driver configured

**Current State:**
- Application uses in-memory storage (`MemStorage` class)
- Database configuration exists but database is not provisioned yet
- Migration directory and Drizzle config are set up for future use

**Type Safety:**
- Shared types between client and server via `@shared` path alias
- Drizzle-Zod integration for runtime validation
- TypeScript strict mode enabled

**Rationale:** The architecture is prepared for database integration but currently runs without it, making development simpler. The storage interface pattern allows seamless transition to PostgreSQL when needed.

## Authentication & Authorization

**Current State:**
- User schema exists with username/password fields
- No authentication middleware implemented yet
- Storage interface includes user lookup methods (by ID and username)

**Prepared Infrastructure:**
- Session management package installed (`connect-pg-simple`)
- User creation and retrieval methods in storage interface

**Rationale:** Authentication is architecturally planned but not yet implemented, allowing the landing page to function without it.

# External Dependencies

## UI & Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled React primitives (accordion, dialog, dropdown, form controls, etc.)
- **shadcn/ui**: Pre-built component implementations using Radix UI
- **Tailwind CSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **class-variance-authority & clsx**: For conditional className management
- **Lucide React**: Icon library

## Data Management
- **TanStack Query v5**: Server state management, caching, and data fetching
- **React Hook Form**: Form state management with Zod validation via @hookform/resolvers
- **Zod**: Schema validation library

## Database & ORM (Configured but not active)
- **Drizzle ORM**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Neon serverless PostgreSQL driver
- **drizzle-zod**: Integration between Drizzle and Zod for validation

## Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety across the stack
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution for development

## Replit-Specific Integration
- **@replit/vite-plugin-cartographer**: Development navigation
- **@replit/vite-plugin-dev-banner**: Development environment banner
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error display in development

## Utilities
- **date-fns**: Date manipulation library
- **nanoid**: Unique ID generation
- **embla-carousel-react**: Carousel component
- **vaul**: Drawer component library
- **cmdk**: Command palette component

## Routing
- **Wouter**: Lightweight client-side routing (alternative to React Router)

**Rationale:** The dependency choices prioritize developer experience, type safety, and modern React patterns. The Radix UI + Tailwind combination provides accessibility and customization. TanStack Query handles complex data fetching scenarios. Drizzle ORM is chosen for its TypeScript-first approach and will be activated when database provisioning occurs.