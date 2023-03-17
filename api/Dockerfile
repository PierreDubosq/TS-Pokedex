FROM node:19.7.0

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]