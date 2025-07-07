# --- Build stage ---
FROM node:20 AS build

WORKDIR /app

# Copy source code into the container
COPY . .

# Install dependencies
RUN npm install

# Build the static site
RUN npm run build

# --- Serve stage ---
FROM nginx:alpine

# Copy build output to nginx's html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port (optional, Compose usually does it)
EXPOSE 80
