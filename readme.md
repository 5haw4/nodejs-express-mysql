# Backend Boilerplate - NodeJS, Express & MySQL

## Features:
- Backend boilerplate using NodeJS, Express and MySQL.
- Set to serve any static frontend with commented out code for serving ReactJS frontend in specific
- Activity logger
- Crash logger
- Include example CRUD API endpoints
- Much more...

## Libraries:
- [express](https://www.npmjs.com/package/express) - minimal framework for NodeJS
- [mysql](https://www.npmjs.com/package/mysql) - NodeJS driver for MySQL
- [dotenv](https://www.npmjs.com/package/dotenv) - easily adds the .env consts to the process object
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - additional rate limiting tool
- [helmet](https://www.npmjs.com/package/helmet) - additional security mainly for response headers
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - easily parsing cookies
- [morgan](https://www.npmjs.com/package/morgan) - used as activity logger
- [nodemon](https://www.npmjs.com/package/nodemon) - used for development

## Project Structure:
    .
    ├── ...
    ├── public                  //all the public files go here (HTML, CSS, frontend JS, etc..)
    ├── src
    │   ├── actions             //DB actions
    │   ├── controllers         //controllers for the endpoints
    │   ├── routes              //routes of the server
    │   │   └── api
    │   │       ├── main        //base files for each of the API versions
    │   │       └── v1          //directory that contains all of the routers for all the endpoints of that API version
    │   ├── utils               //utility files (like DB pool, app error class, etc...)
    │   ├── app.js
    │   └── server.js
    └── ...

## Quick Start
1. Change the .env file consts to your proper values
2. Run ```npm install``` to install the dependencies
3. Run the MySQL migration script ```npm run migrate```
4. Run ```npm start``` to start the development server
5. Go to ```localhost:3001``` to see the main HTML page, or try to test the CRUD functions by making API calls to the following endpoints:
    1. Create example row:
        
        ```
        POST /api/v1/examples
        Content-Type: application/json
        {
            "column1": <String>, 
            "column2": <String>
        }
        ```
    3. Get example row by ID:
        
        ```
        GET /api/v1/examples/:id
        Content-Type: application/json
        ```
    4. Get all example rows:
        
        ```
        GET /api/v1/examples
        Content-Type: application/json
        ```
    5. Update example row:
        
        ```
        PATCH /api/v1/examples
        Content-Type: application/json
        {
            "id": <Integer>, 
            "column1": <String>, 
            "column2": <String>
        }
        ```
    6. Delete example row:
        
        ```
        DELETE /api/v1/examples/:id
        Content-Type: application/json
        ```