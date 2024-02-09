FROM node:18-alpine

WORKDIR /

COPY package.json package-lock.json ./
RUN npm install

COPY next.config.js ./next.config.js
COPY jsconfig.json ./jsconfig.json
COPY public ./public
COPY src ./src
COPY ./src/components ./src/components
COPY ./src/pages ./src/pages
COPY ./src/styles ./src/styles

CMD ["yarn","dev"]