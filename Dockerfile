FROM node:bullseye
RUN apt-get update && apt-get upgrade -y
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /home/app
COPY package.json pnpm-lock.yaml /home/app/

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then pnpm install --frozen-lockfile; \
    else pnpm install --only=production; \
    fi

COPY . /home/app/

RUN pnpm build

CMD ["node", "./dist/src/app.js"]