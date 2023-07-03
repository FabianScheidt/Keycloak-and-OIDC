FROM node:18

COPY package.json yarn.lock ./
RUN yarn install

COPY ./ ./
RUN yarn build

ENTRYPOINT ["node", "dist/main.js"]
