#Use an official node.js runtime as a parent image
FROM node:22-alpine

#set the working directory
WORKDIR /app

#copy the package.json and package-locl.json file to the container
COPY package*.json .

#install dependencies
RUN npm install

#Copy the rest of the app code
COPY . .

