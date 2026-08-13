# Build stage
FROM node:20-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# We must use Vite env vars prefix
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-/api/v1}
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
