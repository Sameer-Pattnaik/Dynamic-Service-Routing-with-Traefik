# Stage 1: Build the Vite React app
FROM node:lts-alpine AS base
WORKDIR /usr/local/app
COPY package.json yarn.lock ./

FROM base AS dev
RUN yarn install
COPY . .
CMD ["yarn", "dev"]

FROM base AS final
RUN yarn install --frozen-lockfile --production && \
    yarn cache clean
COPY ./src ./src
CMD ["node", "src/index.js"]
