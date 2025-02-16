# Build stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Copy build to volume
VOLUME /app/build
CMD ["cp", "-r", "/app/build/.", "/usr/share/nginx/html/"] 