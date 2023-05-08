# ---- Base Node ----
FROM node:19-alpine
WORKDIR /app
COPY package.json ./
RUN ls
RUN echo 104.18.7.192 api.openai.com >> /etc/hosts
RUN npm i --registry=https://registry.npm.taobao.org --force

COPY . ./

RUN npm run build
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]
