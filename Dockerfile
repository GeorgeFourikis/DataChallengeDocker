FROM node

ENV NODE_VERSION 10.9.0

# Create app directory here
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install


# Copy app source code
COPY . /usr/src/app

#Expose port and start application
EXPOSE 3000
CMD [ "node", "app.js" ]
#  "mongod" && "node", "loadDB.js" && 