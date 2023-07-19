FROM node:20.2-alpine as build

# Workdir
WORKDIR /revent-web-client

# Install deps
COPY package.json package-lock.json ./
RUN npm i --force

# Build client
COPY ./ ./
RUN npx ng run revent-web-client:prerender --routes-file prerender-routes.txt
RUN npm run build:ssr

# Serving node
FROM node:20.2-alpine
WORKDIR /root/

ENV NODE_ENV=production

COPY --from=build /revent-web-client/dist/ ./dist/
ENTRYPOINT [ "node", "dist/revent-web-client/server/main.js" ]