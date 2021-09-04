#### STAGE 1: Build ###
#
#FROM node:12.7-alpine AS build
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#RUN npm i angular-bootstrap-md --save
#
#RUN npm i @angular/common --save
#
#RUN npm i @angular/core --save
#
#COPY . .
#
#RUN npm run build
#
#
#### STAGE 2: Run ###
#
#FROM nginx:1.17.1-alpine
#
#COPY --from=build /usr/src/app/dist/seating-a /usr/share/nginx/html
#
## Run the web service on container startup.
#CMD [ "npm", "start" ]

## Use the official lightweight Node.js 12 image.
## https://hub.docker.com/_/node
#FROM node:12-slim
#
## Create and change to the app directory.
#WORKDIR /usr/src/app
#
## Copy application dependency manifests to the container image.
## A wildcard is used to ensure both package.json AND package-lock.json are copied.
## Copying this separately prevents re-running npm install on every code change.
#COPY package*.json ./
#
## Install production dependencies.
#RUN npm install
#
## Copy local code to the container image.
#COPY . ./
#
## Run the web service on container startup.
#CMD [ "npm", "start" ]

FROM node:12-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 8080
CMD [ "node", "server.js" ]
