# ── Builder stage ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy manifests first for layer caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm run build

# ── Production stage ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install pnpm for production deps only
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy compiled server and frontend build
COPY --from=builder /app/dist ./dist

# Expose port (default 5000, override via PORT env)
EXPOSE 5000

# Votes persist in this volume — mount it to avoid data loss on redeploy
VOLUME ["/app/dist/votes.json"]

CMD ["node", "dist/index.js"]
