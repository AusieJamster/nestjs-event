# Use the official Node.js image as the base  
FROM node:18.6.0-alpine3.15
RUN addgroup app && adduser -S -G app app
USER app
# Set the working directory inside the container  
WORKDIR /app  
# Copy package.json and package-lock.json to the container  
COPY --chown=app:node package*.json ./  
# Install dependencies  
RUN npm i
# Copy the app source code to the container  
COPY --chown=app:node . . 
# Expose the port the app will run on  
EXPOSE 3000  