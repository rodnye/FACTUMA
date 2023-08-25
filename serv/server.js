// Modules imports
const cfg = require("../config.js");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server , {
    cors : {
        origin : "*",
        method : ["POST" , "GET"]
    }
});

// Global middlewares
app.use(express.json());

// Socket Router (passing io as param)
require("./router/socket.js")(io);

// Start the server and listen on the specified port
app.listen(cfg.PORT, () => {
    console.log("Running in port " + cfg.PORT);
});

//
// Serve static pages
//
if (!cfg.isProduction) {
    // Development mode - Use Webpack server for serving static files
    const webpackRouter = require('./webpack-router');
    app.use("/", webpackRouter);
    console.log("Using Webpack server for development mode...");
}
else {
    // Production mode - Use static server for serving static files
    app.use("/", express.static(cfg.DIST));
    console.log("Using static server for production mode...");
}