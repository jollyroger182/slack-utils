FROM oven/bun:latest AS builder
WORKDIR /app

COPY package.json ./
COPY bun.lock ./

RUN bun install --frozen-lockfile

FROM oven/bun:latest
WORKDIR /app

COPY --from=builder /app /app
COPY tsconfig.json index.ts ./

EXPOSE 8000

ENTRYPOINT [ "bun", "index.ts" ]