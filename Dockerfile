# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:16-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN npm install --production

# Set envionment variables
ENV PORT "8080"
ENV _API_KEY ""
ENV _DATASET_ID ""
ENV _TABLE_ID ""

# Copy local code to the container image.
COPY ./src/ ./

# Run the web service on container startup.
CMD ["node", "index.js"]
