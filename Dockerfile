FROM node:20.10-alpine AS build

COPY . /usr/src

WORKDIR /usr/src

ENV NODE_ENV=production

RUN npm install --include dev

RUN node scripts/generate-routes-file.js

RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]
