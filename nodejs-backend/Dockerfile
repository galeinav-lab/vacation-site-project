FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY uploads ./uploads

RUN mkdir -p uploads

EXPOSE 5000

CMD ["npx", "ts-node", "src/app.ts"]
