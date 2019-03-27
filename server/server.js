require('babel-register');
require('babel-polyfill');
require('./config/env').init();
const path = require('path');

const ejs  = require('ejs');
const cassandra = require('cassandra-driver');

// console.log(process.env.IP_ADDRESS);
// const app = require('express')();

var config = require('nconf');
var https = require("https"); 


if(process.env.NODE_ENV == "production"){
require('dotenv').config({path:__dirname+"/.env"});
}
else{
    require('dotenv').config({path:__dirname+"/../.env"});
}
/**
 * 
 * Cassandra Connection
 * 
 */
const Promise = require('bluebird');

Promise.config({
    cancellation: true
})

// var cassandraConnect = require('./config/cassandraDB').init()

// Cassandra-store(4.1.4) vs Cassandra-driver
// Initialise Cassandra Client and input the Number of Hosts
// var C_Client = new cassandra.C_Client({
//     contactPoints:[
//         config.get("CASSANDRA_DB_HOST1"),
//         config.get("CASSANDRA_DB_HOST2"),
//         config.get("CASSANDRA_DB_HOST3")
//     ]});


// // HTTPS 
// var credentials = {  
//     key: fs.readFileSync("my-api.key", "utf8"),
//     cert: fs.readFileSync("my-api.cert", "utf8")
// };
// https  
//     .createServer(credentials, app)
//     .listen(3000, function() {
//         console.log("My API is running...");
//     });


require('./config/express').init();
var app = require('./config/express').getAppInstance();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


const PORT = config.get("SERVER_PORT");
const HOST = config.get("SERVER_NAME");
server.listen(PORT,HOST);
console.log(`Express server listening on http://${HOST}:${PORT}`)

// Initializing Socket.IO
require('./config/socket.io').init(io);

