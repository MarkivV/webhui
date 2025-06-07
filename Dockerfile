FROM node:slim AS base

WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY prisma ./prisma
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm dlx prisma generate
RUN pnpm run build

# Stage 3: Production image
FROM node:slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

COPY start.sh /usr/local/bin
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 3000
ENV CHECKPOINT_DISABLE=1
ENV DISABLE_PRISMA_TELEMETRY=true
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

ENTRYPOINT ["/app/start.sh"]
