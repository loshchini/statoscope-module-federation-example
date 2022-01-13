FROM node:alpine

WORKDIR /webpack

COPY . /webpack/

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]
