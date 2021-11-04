FROM node:14

# Create app directory, this is in our container / image
WORKDIR /usr/src/app

# Install app dependencies
# A wilcard is used to ensure both package.json and yarn.lock are copied
# where available
COPY package.json ./

RUN yarn

# Bundled app source
COPY . .

RUN yarn build && \
    yarn cache clean

CMD [ "node", "dist/main" ]