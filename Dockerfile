FROM node:18 AS build

WORKDIR /app

ARG DATABASE_URI
ARG PORT
ARG ACCESS_TOKEN_SECRET
ARG REFRESH_TOKEN_SECRET

ENV DATABASE_URI=$DATABASE_URI
ENV PORT=$PORT
ENV ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET
ENV REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/config ./config
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "dist/index.js"]