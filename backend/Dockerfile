FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g tsx
COPY . .
CMD ["tsx", "src/index.ts"]
EXPOSE 3000
