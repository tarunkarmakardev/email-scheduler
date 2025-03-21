FROM node:23-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm --force
COPY . .
RUN pnpm install
RUN pnpm nx run email-scheduler-fe:build
RUN cd ./apps/email-scheduler-fe && pnpx prisma migrate deploy
RUN cd /app
CMD ["sh", "-c", "pnpm nx run email-scheduler-fe:start"]
