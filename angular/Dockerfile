### STAGE 1: Build ###
FROM node:16.3.0-alpine3.13 as build
ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.21.0-alpine
EXPOSE 4200
COPY --from=build /usr/src/app/dist /usr/share/nginx/html