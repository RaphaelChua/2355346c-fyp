'use strict';

import {Router} from 'express';
import Web3 from 'web3';
var config = require('nconf');
const request = require('request');

const router = Router();
const RESTAPI = config.get("SAWTOOTH_RESTAPI");
const HOST = config.get("SAWTOOTH_NETWORK_HOST");
const REQUESTURL = "http://" + HOST + ":" + RESTAPI;

router.get("/peers", (req,res,next)=>{
    // let obj ="";
    request(REQUESTURL + "/peers" , function(error,response,body){
        let obj = JSON.parse(body);
        res.json(obj.data.length);
    })
});

router.get("/blocks",(req,res,next)=>{
    request(REQUESTURL+"/blocks?limit=2000",function(error,response,body){
        let obj = JSON.parse(body);
        res.json(obj.data);
    })
});

router.get("/transactions",(req,res,next)=>{
    request(REQUESTURL+"/transactions?limit=2000",function(error,response,body){
        let obj = JSON.parse(body);
        // console.log(obj.data)
        res.json(obj.data);
    })
});

router.get("/batches",(req,res,next)=>{
    request(REQUESTURL+"/batches?limit=2000",function(error,response,body){
        let obj = JSON.parse(body);
        res.json(obj.data);
    })
});


module.exports = router;
