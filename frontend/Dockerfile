FROM node:18

RUN npm install -g pnpm@8.6.0

WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .
EXPOSE 5173


RUN pnpm build


CMD ["pnpm", "dev"]
