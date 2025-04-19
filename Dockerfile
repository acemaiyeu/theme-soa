# Stage 1: Build app using Node.js 16
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps


COPY . .
RUN npm run build


# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Copy build output from previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: custom nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
