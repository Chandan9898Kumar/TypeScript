

FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and npmrc first
COPY package*.json .npmrc ./

# Copy env file
COPY .env* ./

# Install dependencies
RUN npm install

COPY . .


# This is the Second stage : use lightweight runtime image.
FROM node:lts-alpine AS development

WORKDIR /app

COPY --from=builder /app /app/

ENV NODE_ENV=development

EXPOSE 3000

CMD [ "npm", "run", "dev" ]