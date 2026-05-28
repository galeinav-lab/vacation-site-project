FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN mkdir -p uploads

EXPOSE 5000

CMD ["npx", "ts-node", "src/app.ts"]
