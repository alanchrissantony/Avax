# docker/local/frontend/Dockerfile

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files first
COPY package*.json ./
COPY next.config.mjs ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose Next.js dev server port
EXPOSE 3000

# Run the dev server
CMD ["npm", "run", "dev"]

