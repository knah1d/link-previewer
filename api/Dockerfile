FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose the port the app runs on
EXPOSE 3000

# Use production mode and start the server
ENV NODE_ENV=production
CMD ["node", "index.js"]
