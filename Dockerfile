FROM node:16-alpine

RUN mkdir -p /home/koa-demo/app/node_modules
RUN chown -R node:node /home/koa-demo/app

WORKDIR /home/koa-demo/app

COPY package*.json ./

RUN npm ci

COPY tsconfig.json ./
COPY --chown=node:node . .

RUN npm run build
RUN rm -rf src/

USER node

EXPOSE 3000

CMD ["npm", "run", "start:prod"]