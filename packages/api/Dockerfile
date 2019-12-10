FROM node:12.13.1

WORKDIR /usr/app/src/

RUN echo 'Avant COPY'

COPY . .

RUN echo 'Apres COPY'

RUN ls

RUN yarn install

EXPOSE 8081

