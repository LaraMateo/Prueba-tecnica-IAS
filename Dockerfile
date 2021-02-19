# Define from what image we want to build from.
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

WORKDIR /usr/src/app/server
RUN npm install 

WORKDIR /usr/src/app/client
RUN npm install
RUN npm run start

WORKDIR /usr/src/app/server
EXPOSE 8000
CMD [ "node", "server.js" ]

#Use to build: docker build -t mateolara315/node-web-app .
#Use to run: docker run -p 49160:8000 -d mateolara315/node-web-app
#Use to open docker shell: docker run -it mateolara315/node-web-app sh