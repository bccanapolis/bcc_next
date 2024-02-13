FROM node:20-alpine3.18

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install --cpu=x64 --os=linux sharp
RUN npm ci
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
