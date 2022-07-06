FROM node:16.9-alpine
WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "npm", "dev" ] 