FROM node:18-alpine3.18 AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy production build from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "run", "start"]
