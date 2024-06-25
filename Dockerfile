FROM node:18.10.0
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD sh -c "npm run db:migrate:prod && npm run db:seed:run && npm run start:prod"
