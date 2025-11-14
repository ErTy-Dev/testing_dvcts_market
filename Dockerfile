# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Clean previous build artifacts to ensure fresh build
RUN rm -rf .output .nuxt || true

# Build the application (SSR build)
RUN pnpm run build

# Stage 2: Production - только Node.js (без nginx)
FROM node:20-alpine

WORKDIR /app

# Install pnpm first
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built application from builder
COPY --from=builder /app/.output/ ./.output/
COPY --from=builder /app/.nuxt/ ./.nuxt/
COPY --from=builder /app/nuxt.config.ts ./nuxt.config.ts

# Expose Nuxt server port
EXPOSE 3000

# Environment variables передаются через docker-compose.yml из .env файла

# Start Nuxt server
CMD ["node", ".output/server/index.mjs"]
