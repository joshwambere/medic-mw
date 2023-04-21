## Backend Express server
This documentation explains how to configure, launch and test backend server.

**Assumption** : we suppose that we start in `Medic-mw` directory.

## Environment requirements

You need to create `.env.development` or `.env.production` files.

add the following environments variable in one of your files:

```
# PORT
PORT=PORT


NODE_ENV
# TOKEN
SECRET_KEY=secret
TOKEN_EXPIRES_IN=1d
# SENDGRID

# CORS
ORIGIN=*
CREDENTIALS=true

SOCKET_PORT=3000
```

## Configuring

To configure backend server, you need to have:

- node 14<
- yarn

### install dependencies 

```bash
yarn 
```

### Run backend server
if you have mongoDb installed locally, you can run the server with the following command:
```bash 

yarn start
```

otherwise, you can run the server with docker-compose:
```bash
docker-compose up --build
```


```bash
email:admin@gmail.com
```
You can use this user to:


 - login
 - create a project
 - create a a chat room
 - invite contributors to the project
 - send messages in the chat room



### API testing

For API testing, you need to launch the backend server.

Then you can access the API docs at:
[http://localhost:PORT/api-docs](http://localhost:PORT/api-docs)

