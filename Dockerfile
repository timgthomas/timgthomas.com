FROM spurin/hexo
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
EXPOSE 4000
CMD ["yarn", "start"]
