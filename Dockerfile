FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json

COPY api/package*.json ./
RUN npm install



# Copy the rest of the application code
COPY api/ ./


# Expose the port the app runs on
EXPOSE 3000
CMD ["npm", "run", "dev"]