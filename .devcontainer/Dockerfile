# Use the official Node.js image from Docker Hub
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY .. .

# Expose the port the app runs on
EXPOSE 3400

# Set default command to start the application
CMD ["npm", "run", "dev"]