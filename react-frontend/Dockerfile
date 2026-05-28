FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY public ./public
COPY src ./src

ENV WATCHPACK_POLLING=true
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npm", "start"]
