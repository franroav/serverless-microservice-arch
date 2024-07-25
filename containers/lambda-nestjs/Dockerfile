# Stage 1: Build the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env ./.env

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app/.build/src ./.build/src
COPY package.json package-lock.json ./
COPY serverless.yaml ./
COPY .env ./.env
# COPY .serverlessrc /root/.serverlessrc

# Install only production dependencies
RUN npm install --only=production

# Install Serverless framework
RUN npm install serverless --global

# Install Serverless framework and dotenv plugin
RUN npm install serverless serverless-dotenv-plugin --global
# RUN npm install serverless serverless-plugin-typescript --global
RUN npm install serverless serverless-plugin-optimize --global
RUN npm install serverless serverless-offline plugin --global


# Set environment variables to disable telemetry and use API key for login
ENV SLS_TELEMETRY_DISABLED=1
ENV SERVERLESS_ACCESS_KEY=AK30wNi0EUQla3CVmTxiOYiIOQbnPx6mBJStAAN04ylnG

# Set environment variables for AWS credentials
ENV AWS_ACCESS_KEY_ID=ASIA5NAGIDAVLZSLYTPQ
ENV AWS_SECRET_ACCESS_KEY=KseBWViy+bJ9KUG9TK0LdOeLIeV3jKuFnQa5PXOW
ENV AWS_SESSION_TOKEN=IQoJb3JpZ2luX2VjEEkaCXVzLWVhc3QtMSJHMEUCIQClKomK5JbKNvzWtrEGbNyb0dew8b8xSaynro1RmJLq2AIgICly1cxlCUUwmhhynoEVzWx7bzx0IZa85/nIzN1fcVMq9AEI8f//////////ARAAGgw5MjEyODM1OTgzNzgiDNj9M+DFD+zpfFu7GyrIAQrJwtPCmMB38MsGrySEIexTnRFFR7fFWg6fwwKVouj8zX3ri9tR6pGuJA5w9xsGv/9WUNsnAYPUdEG+eslxmV+yPRv6yy5x2qMtBDQ7B85FKY4dcTbM4QD2R9THQpmyQJEjIFNdcWy2080rFTMgH1D9K2Gyr2lY8KjSVCxMzWi68H9V3gzFhjMcdZ0v5umhMQqMge1lgZVygBLTu5dY4QJSvrz9K6XRb6zIRwInDD+b8enI1beLKgX5T7/zeew6UMtV1o0QRrHQMNCg9rMGOpgBA+uK+itD5qx5NVpJCExoSPJDRtrSEUah9s/KV7UlTL4gD0cxD/j7EXCeQW1lFcOAJm56LfLsFJ8JWjMMSoLcG8TvpC7b0r66j4Ql8Lpc41CFKamcHMlMvOr4PjDXxhvMAdG/+yJHXJuSYPwJcbP6Jq85G78E4sOj0PDlicUOxHmxWS7TBYhciUs0Po0gjpEjxHFA/RgQL/0=

# Expose the application port
EXPOSE 3000

# Start the application using Serverless Offline
CMD ["npx", "serverless", "offline", "start"]

# Start the application
# CMD ["node", ".build/src/lambda"]
# CMD ["sls", "offline", "start"]
# Start the application using Serverless Offline
# CMD ["npx", "serverless", "offline", "start"]

# FROM node:alpine
# # Create app directory
# # WORKDIR /usr/src/app
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # #Install app dependencies
# # COPY package*.json ./
# # RUN npm install glob rimraf
# # RUN npm install -g @nestjs/cli
# # RUN npm install --save aws-serverless-express
# # RUN npm install --save aws-lambda
# # RUN npm install --save-dev serverless-plugin-typescript
# # RUN npm install --save-dev serverless-plugin-optimize
# # RUN npm install --save-dev serverless-offline plugin
# # # npm continuous integration 
# # RUN npm ci
# # # Bundle app source 
# # COPY . .

# RUN npm run build

# EXPOSE 3000
# # Run npm Istall 
# # CMD ["npm", "run", "start:dev"]
# CMD ["sls", "offline", "start"]
  
# #CMD ["node", "dist/main"]
