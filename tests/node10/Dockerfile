FROM node:10.24.0 as node

COPY . .

FROM node as test-npm
RUN npm install
COPY . .
RUN npm run test

FROM node as test-yarn
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run test