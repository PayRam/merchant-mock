# syntax=docker/dockerfile:1

#docker build -t payram-web:v0.1 . 
#docker run -d --publish 80:2358 payram-web:v0.1

# Use an official Node.js LTS image as the base image
FROM node:lts

# Copy source
COPY . /merchant-mock
WORKDIR /merchant-mock

# Install dependencies
RUN npm install

# Build the Next.js application
RUN npm run build

# Expose the port that your Next.js application will run on
EXPOSE 8081

# Command to run your Next.js application
CMD ["npm", "start"]
