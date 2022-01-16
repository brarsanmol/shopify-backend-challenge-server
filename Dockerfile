FROM node:lts-alpine

RUN mkdir /application

WORKDIR /application

ADD . /application/

RUN npm ci

EXPOSE 3000

CMD [ "npm", "run", "deploy" ]