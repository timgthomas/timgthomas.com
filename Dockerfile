FROM node:16
RUN npm install -g hexo-cli
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 4000
CMD [ "npm", "start" ]
