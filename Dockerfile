FROM node:14-buster-slim

# create app dir
WORKDIR /app

# install app dependencies
COPY package*.json ./

RUN npm install
# if you are buiding code for production
# RUN npm install --only=production

COPY ./ ./ 

EXPOSE 3000
CMD ["npm", "run", "dev"]
