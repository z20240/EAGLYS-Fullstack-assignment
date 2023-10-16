# EAGLYS Fullstack assignment

## Server

For server side, using typescript with nodejs and node-sql-parser to parse the sql into AST.

### How to test

By using `yarn test` could run unit testing for the ParseSQL function.

### How to run.

- In develop environment, we can using `yarn dev` to start the server, the default port is on `3333`.
- In production environment, we can using `yarn start` to start the server, the default port is on `3333` (Please remind the `dist` folder should be exist).

### How to build

By using `yarn build` could build the project. It will be build into `dist` folder.

## Client

For client side, using react.js to complete a simple page for user input the SQL Query.

The `build` and `run` are the same the way as `create-react-app`.

### For dockerlize.

Just using `docker-compose up -d` to start the service.
