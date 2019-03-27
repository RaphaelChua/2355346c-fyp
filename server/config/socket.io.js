import _ from 'lodash';
import {
  Router
} from 'express';
const router = Router();
const request = require('request');
var config = require('nconf');
const SAWTOOTH_PORT = config.get("SAWTOOTH_RESTAPI");
const SAWTOOTH_HOST = config.get("SAWTOOTH_NETWORK_HOST");
const REQUESTURL = "http://" + SAWTOOTH_HOST + ":" + SAWTOOTH_PORT;

const getBlockAPI = (socket) => {

  request(REQUESTURL + "/blocks?limit=1000", function (err, res, body) {
    let obj = JSON.parse(body);
    // console.log(JSON.stringify(obj.data.length))
    socket.emit("FromBlock", obj.data.length)
  })
}

const getTransactionAPI = (socket) => {
  request(REQUESTURL + "/transactions?limit=1000", function (err, res, body) {
    let obj = JSON.parse(body);
    // console.log(JSON.stringify(obj.data.length))
    socket.emit("FromTransaction", obj.data.length)
  })
}

const getBatchAPI = (socket) => {
  request(REQUESTURL + "/batches?limit=1000", function (err, res, body) {
    let obj = JSON.parse(body);
    socket.emit("FromBatch", obj.data.length)
  })
}

export function init(io) {
  io.sockets.setMaxListeners(0);
  io.on('connection', (socket) => {
    socket.on('subscribeBlockFeed', (interval) => {

      console.log("Block Feed Connected", interval)
      setInterval(
        (() => {
          getBlockAPI(socket);
        }), interval
      )
    });
    socket.on('subscribeTransactionFeed', (interval) => {

      console.log("Transaction Feed Connected"), setInterval(
        (() => {
          getTransactionAPI(socket);
        }), interval
      )

    });

    socket.on('subscribeBatchFeed', (interval) => {
      console.log("Batch Feed Connected"), setInterval(
        (() => {
          getBatchAPI(socket);
        }), interval
      )
    });
    socket.on("disconnect", () => console.log("Client disconnected"))
  })

}