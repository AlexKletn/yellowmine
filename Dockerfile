FROM node:20-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine As build
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist

FROM node:20-alpine As build-gui
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node ./yellowmine-gui .

RUN npm ci;
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

RUN ls -alh

USER node

FROM node:20-alpine As production
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build-gui /usr/src/app/dist ./yellowmine-gui/dist

CMD [ "node", "dist/main.js" ]