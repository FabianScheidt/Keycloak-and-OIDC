FROM node:18

# Install socat to forward port 8080 to keycloak
RUN apt update && apt install -y socat
RUN yarn global add concurrently

# Install node dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Build project
COPY ./ ./
RUN yarn build

ENTRYPOINT ["concurrently", "socat TCP-LISTEN:8080,reuseaddr,fork TCP:keycloak:8080", "node dist/main.js"]
