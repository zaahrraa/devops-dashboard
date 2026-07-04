# Stage 1: Build the app
FROM node:20-alpine AS builder

# Install pnpm globally to manage your dependencies
RUN npm install -g pnpm

WORKDIR /app

# Copy the dependency files first (caching layer)
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the project source code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Serve the app
FROM node:18-alpine AS runner
WORKDIR /app

# Set to production mode
ENV NODE_ENV=production

# Copy the standalone build artifacts from the builder stage
# This creates a very small, efficient production image
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# The command to start your production server
CMD ["node", "server.js"]