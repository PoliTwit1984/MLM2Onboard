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
ARG VITE_ADOBE_FONTS_KIT_ID
ENV VITE_MIXPANEL_PROJECT_TOKEN=$VITE_MIXPANEL_PROJECT_TOKEN
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN
ENV VITE_ADOBE_FONTS_KIT_ID=$VITE_ADOBE_FONTS_KIT_ID

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
