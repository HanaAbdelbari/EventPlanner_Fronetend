## Stage 1: Build
#FROM node:18-alpine AS build
#WORKDIR /app
#COPY package*.json ./
#RUN npm ci
#RUN npm install -g vite
#COPY . .
#RUN npm run build
#
## Stage 2: Production
#FROM nginx:alpine
#COPY --from=build /app/dist /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]

# -------- Stage 1: Build --------
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g vite
COPY . .
RUN npm run build

# -------- Stage 2: OpenShift-safe nginx --------
FROM nginxinc/nginx-unprivileged:latest

# Copy built files with proper ownership
COPY --chown=101:101 --from=build /app/dist /usr/share/nginx/html

# Copy the fixed config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]