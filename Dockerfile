## Stage 1: Build
#FROM node:18-alpine AS build
#WORKDIR /app
#COPY package*.json ./
#RUN npm ci
#
#COPY . .
#RUN npm run build
#
## Stage 2: Production
#FROM nginx:alpine
#COPY --from=build /app/dist /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci
RUN npm install -g vite

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginxinc/nginx-unprivileged:latest

# Switch to root to copy files
USER root

# Copy nginx config to main location
COPY nginx.conf /etc/nginx/nginx.conf

# Remove the default config from conf.d
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy built app from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Adjust permissions for non-root user
RUN chown -R nginx:nginx /usr/share/nginx/html

# Switch back to non-root user
USER nginx

EXPOSE 8080

# Correct CMD to run nginx
CMD ["nginx", "-g", "daemon off;"]