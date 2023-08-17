FROM node:lts-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production
EXPOSE 3000
USER node
CMD [ "dumb-init","npm", "start" ]
