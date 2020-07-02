const { env } = require("process")
const express = require("express");
const rateLimit = require("express-rate-limit")
const { activityLogger } = require("./controllers/loggerController")
const cookieParser = require('cookie-parser')
const helmet = require("helmet")
const path = require('path');
const apiV1 = require("./routes/api/main/apiV1")
const globalErrorHandler = require("./controllers/errorController")

var app = express();

//allowing only up to 25 requests per IP per second
if(env.NODE_ENV == env.ENV_PROD) {
    //limiting each IP to 25 requests per second
    app.use(rateLimit({
        max: 25, 
        windowMs: 1000,
        message: { 
            error: true, 
            status: "error", 
            message:"too many requests"
        }
    }))
}

//logging all requests and responses
app.use(activityLogger())

//for parsing json encoded and url encoded request bodies
app.use("*", 
    express.urlencoded({ extended: true, limit: env.DEFAULT_REQUEST_LIMIT }),
    express.json({ limit: env.DEFAULT_REQUEST_LIMIT })
)

//using cookie parser
app.use(cookieParser(env.SIGNED_COOKIES_SECRENT))

//overides default headers to defend againts all sorts of attacks
app.use(helmet())

//serving the files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

//setting up API routes
app.use("/", apiV1)

/*
    if trying to load a route that is not a file and not any of the API endpoints:
        - serving react's index.html (which then react-router will continue handling the route on the frontend)
        - if you're not using react, you should change the served file to your 404 html file
*/
app.all("*", (req, res) => {
    //use the following if using react in the front to always serve the index.html file
    //res.sendFile(path.join(__dirname, '../public/index.html'));
    
    //else serve your html 404 page
    res
        .status(404)
        .sendFile(path.join(__dirname, '../public/404page.html'));
})

//error handling middleware
app.use(globalErrorHandler)

module.exports = app;