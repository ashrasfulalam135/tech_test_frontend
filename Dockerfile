FROM node:18.12.1

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the container
COPY package*.json /app/frontend

# Install project dependencies
RUN npm install

# Copy the rest of the React application code to the container
COPY . .

# Build the React application
RUN npm run build

# Expose a port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]