# Use Node.js 18
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

# Install dependencies for both frontend and backend
RUN npm ci --prefix frontend && npm ci --prefix backend

# Copy all files
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Expose port
EXPOSE 3000

# Start backend server
WORKDIR /app/backend
CMD ["node", "server.js"]

