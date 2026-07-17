# ---------- Stage 1: Install Dependencies ----------
FROM node:22-alpine AS deps

WORKDIR /app

# Enable pnpm
RUN corepack enable
RUN corepack prepare pnpm@10.30.3 --activate
# Copy dependency files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# ---------- Stage 2: Build Application ----------
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@10.30.3 --activate

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy project files
COPY . .

# Build the Next.js app
RUN pnpm build

# ---------- Stage 3: Production ----------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable
RUN corepack prepare pnpm@10.30.3 --activate

# Copy only what's needed to run the app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/lib ./lib
# Expose Next.js port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]