# Use the official Node.js 20 image
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# --------------------------

# Production container
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

RUN npm install --omit=dev

EXPOSE 3000

# Start Next.js app
CMD ["npm", "run", "start"]
