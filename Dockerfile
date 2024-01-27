# Use an official Node.js LTS image as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code into the container
COPY . .

# Your application binds to port 8081, so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8081

# Define the command to run your app (modify the 'app.js' with your entry file name if different)
CMD ["node", "app.js"]
