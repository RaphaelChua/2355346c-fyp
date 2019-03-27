'use strict';

import {Router} from 'express';
import fs from 'fs';
import Web3 from 'web3';
var web3 = new Web3();
var path = require('path');
var mime = require('mime');
import {CompileContract,GetStorageAt,GetStorageAtWithRetry} from '../../services/ContractInfo';
import {AccountInfo,UnlockAccount} from '../../services/EthRPC';
import {TransactionBuilder} from '../../services/TransactionBuilder';
import {PythonShell} from 'python-shell';
var config = require('nconf');
const rp = require('request-promise');
const rpt = require('promise-request-retry');
var {Base64Encode} = require('base64-stream');

//Initialise IdLibrary
const IdGenerator = require('../../component/OrderNumberGenerator/index');
const OrderID = IdGenerator("orderid");
const ProductBatchID = IdGenerator("productid");

const router = Router();
const RESTAPI = config.get("SAWTOOTH_RESTAPI");
const HOST = config.get("SERVER_NAME");
const REQUESTURL = "http://" + HOST + ":" + RESTAPI;

const SETHRPCPORT = config.get("SETH_RPC_PORT");
const SETHRPCHOST = config.get("SETH_RPC_HOST");
const SETHPROVIDER = "http://"+SETHRPCHOST+":"+SETHRPCPORT;
const PYTHONPATH = config.get("PYTHON_PATH");


const IP_ADDRESS = process.env.IP_ADDRESS;
const RETRIEVE_VIDEO = "http://" + IP_ADDRESS + ":6060"

import {
    increaseHexByOne,
    convertToAddress,
    toHex,
    readContractAddress,
    convertEpoch,
} from '../../component/utils.js';
import { file } from 'babel-types';

function replaceText(cleanWord){
   return cleanWord.replace(/\0/g, '').replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '').replace('$','');
}

// ======= API =======

router.get("/getContractAddress",(req,res,next)=>{
    const results= JSON.parse(fs.readFileSync(__dirname+"/../../contract_address/ContractAddress.json"));
    res.send(results.ContractAddress).sendStatus(200);
})

router.get("/getContractABI",(req,res,next)=>{
    const results = JSON.parse(fs.readFileSync(__dirname + "/../../services/contracts/compiled/HalalFood_abi.json"));
    res.send(results).sendStatus(200);
})

router.get("/getContractOwnership",(req,res,next)=>{
    const orderIndex = toHex(0);
    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        const ownerAddress = convertToAddress(results.result);
        res.status(200).send(ownerAddress);
    }).catch((err)=>{console.log(err)});
})

router.get("/getContractSupplierAddress",(req,res,next)=>{
    const orderIndex = toHex(1);
    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        const supplierAddress = convertToAddress(results.result);
        res.status(200).send(supplierAddress);
    }).catch((err)=>{console.log(err)});
})

router.get("/getContractDistributorAddress",(req,res,next)=>{
    const orderIndex = toHex(2);
    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        const distributorAddress = convertToAddress(results.result);
        res.status(200).send(distributorAddress);
    }).catch((err)=>{console.log(err)});
})


router.get("/getContractThirdPartyLogisticsAddress",(req,res,next)=>{
    const orderIndex = toHex(3);
    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        const thirdPartyLogisticsAddress = convertToAddress(results.result);
        res.status(200).send(thirdPartyLogisticsAddress);
    }).catch((err)=>{console.log(err)});
})

/**
*
*    Getting the contract consumer address
*
**/
router.get("/getContractConsumerAddress",(req,res,next)=>{
    const orderIndex = toHex(4);
    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        const consumerAddress = convertToAddress(results.result);
        res.status(200).send(consumerAddress);
    }).catch((err)=>{console.log(err)});
})

/**
*
*    Getting the contract distributor payment amount
*
**/
router.get("/getDistributorPayments",(req,res,next)=>{
    const orderIndex = toHex(5);
    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        if(results.result==null){
            res.status(200).send('0');
        }
        else{
            const distributorPayments = web3.utils.hexToNumber(results.result);
            res.status(200).send((distributorPayments/100 ).toString());
        }
    }).catch((err)=>{console.log(err)});
})

/**
*
*    Getting the contract consumer deposit amount
*
**/
router.get("/getConsumerDeposits",(req,res,next)=>{
    const orderIndex = toHex(6);
    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        if(results.result==null){
            res.status(200).send('0');
        }
        else{
            const consumerDeposits = web3.utils.hexToNumber(results.result);
            res.status(200).send(consumerDeposits.toString());
        }
    }).catch((err)=>{console.log(err)});
})

/**
*
*    Getting the contract delivery payment amount
*
**/
router.get("/getDeliveryPayments",(req,res,next)=>{
    const orderIndex = toHex(7);
    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        if(results.result==null){
            res.status(200).send('0');
        }
        else{
            const deliveryPayments = web3.utils.hexToNumber(results.result);
            res.status(200).send((deliveryPayments / 100).toString());
        }
    }).catch((err)=>{console.log(err)});
})


router.get("/queryAllOrders",(req,res,next)=>{

    const orderIndex = toHex(8);
    const blockNumber="";
  
    var promises = [];
    var counter = 0;

    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        const StorageLength = web3.utils.toDecimal(results.result);
        for(var i = 0; i<StorageLength;i++){
            for(var k = 0; k < 4; k++){
                var newKey = web3.utils.sha3(orderIndex);
                newKey = increaseHexByOne(newKey,counter);
                counter++;
                promises.push(rp(GetStorageAt(readContractAddress(),newKey,"latest")));
            }
        }
        return Promise.all(promises);
    }).then((AllResults)=>{
 
        var productSerial = 0;

        var dict = [];
        var orderid;
        var batchid;
        var productname;
        var qty;

        for(var i =0; i<AllResults.length;i++)
        {
            if(productSerial == 0)
            {
                console.log("Order ID - " + web3.utils.hexToNumber(AllResults[i].result));
                orderid =  web3.utils.hexToNumber(AllResults[i].result)
                productSerial++;
            }
            else if(productSerial == 1)
            {
                console.log("Batch ID - " + web3.utils.hexToNumber(AllResults[i].result));
                batchid =  web3.utils.hexToNumber(AllResults[i].result)
                productSerial++;
            }
            else if(productSerial == 2)
            {
                console.log("Product Name - " + replaceText(web3.utils.toAscii(AllResults[i].result)));
                productname = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 3)
            {
                console.log("Quantity - " + web3.utils.hexToNumber(AllResults[i].result));
                qty = web3.utils.hexToNumber(AllResults[i].result)
                dict.push({
                    "OrderID" : orderid,
                    "BatchID" : batchid,
                    "ProductName" : productname,
                    "Quantity" : qty,
                });
                orderid = batchid = productname = qty = "";
                productSerial = 0;
            }
        }
    console.log(JSON.stringify(dict,null,2))
        res.json(dict);
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/queryStatus",(req,res,next)=>{

    const orderIndex = toHex(9);
    const blockNumber="";
  
    var promises = [];
    var counter = 0;

    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        const StorageLength = web3.utils.toDecimal(results.result);
        for(var i = 0; i<StorageLength;i++){
            for(var k = 0; k < 5; k++){
                var newKey = web3.utils.sha3(orderIndex);
                newKey = increaseHexByOne(newKey,counter);
                counter++;
                promises.push(rp(GetStorageAt(readContractAddress(),newKey,"latest")));
            }
        }
        return Promise.all(promises);
    }).then((AllResults)=>{
        console.log(AllResults)
        var productSerial = 0;

        var dict = [];
        var remarks;
        var videohashid_part1;
        var videohashid_part2;
        var videohashid_part3;
        var videoencodedid;

        for(var i =0; i<AllResults.length;i++)
        {
            if(productSerial == 0)
            {
                console.log("Remarks - " +replaceText(web3.utils.toAscii(AllResults[i].result)));
                remarks =  replaceText(web3.utils.toAscii(AllResults[i].result))
                productSerial++;
            }
            else if(productSerial == 1)
            {
                console.log("Video HashID part 1 - " + web3.utils.toAscii(AllResults[i].result));
                videohashid_part1 = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 2)
            {
                console.log("Video HashID part 2 - " + web3.utils.toAscii(AllResults[i].result));
                videohashid_part2 = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 3)
            {
                console.log("Video HashID part 3 - " + web3.utils.toAscii(AllResults[i].result));
                videohashid_part3 = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 4)
            {
                console.log("Video Encoded ID - "+ web3.utils.toAscii(AllResults[i].result));
                videoencodedid = web3.utils.toAscii(AllResults[i].result);
                dict.push({
                    "Remarks" : remarks,
                    "Video_HashID" : videohashid_part1+videohashid_part2+videohashid_part3,
                    "Video_Encoded_ID" : replaceText(videoencodedid),
                });
                remarks = videohashid_part1 = videohashid_part2 = videohashid_part3 = videoencodedid = "";
                productSerial = 0;
            }
        }
    console.log(JSON.stringify(dict,null,2))
        res.json(dict);
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/queryStatusInformation",(req,res,next)=>{

    const orderIndex = toHex(10);
    const blockNumber="";
  
    var promises = [];
    var counter = 0;

    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        const StorageLength = web3.utils.toDecimal(results.result);

        // promises = retryQueryStatusInformation(StorageLength,orderIndex,counter)

        //retry part pass in StorageLength, orderIndex and reset counter to 0
        for(var i = 0; i<StorageLength;i++){
            for(var k = 0; k < 7; k++){
                var newKey = web3.utils.sha3(orderIndex);
                newKey = increaseHexByOne(newKey,counter);
                counter++;
                promises.push(rpt(GetStorageAtWithRetry(readContractAddress(),newKey,"latest")));
            }
        }
        return Promise.all(promises);
    }).then((AllResults)=>{
        // console.log(AllResults)
        var productSerial = 0;

        var dict = [];
        var remarks;
        var temp;
        var pressure;
        var humidity;
        var movement;
        var environment;
        var date;

        for(var i =0; i<AllResults.length;i++)
        {
            if(productSerial == 0)
            {
                // console.log("Remarks - " +replaceText(web3.utils.toAscii(AllResults[i].result)));
                remarks =  replaceText(web3.utils.toAscii(AllResults[i].result))
                productSerial++;
            }
            else if(productSerial == 1)
            {
                // console.log("Temperature - " + web3.utils.toAscii(AllResults[i].result));
                temp = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 2)
            {
                // console.log("Pressure - " + web3.utils.toAscii(AllResults[i].result));
                pressure =replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 3)
            {
                // console.log("Humidity - " + web3.utils.toAscii(AllResults[i].result));
                humidity =replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 4)
            {
                // console.log("Movement - " + web3.utils.toAscii(AllResults[i].result));
                movement = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 5)
            {
                // console.log("Environment - " + web3.utils.toAscii(AllResults[i].result));
                environment = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 6)
            {
                console.log("Date - " + web3.utils.toAscii(AllResults[i].result));
                date = convertEpoch(web3.utils.toAscii(AllResults[i].result));

                dict.push({
                    "Remarks" : remarks,
                    "Temperature" : temp,
                    "Pressure" : pressure,
                    "Humidity" : humidity,
                    "Movement" : movement,
                    "Environment": environment,
                    "Date": date
                });
                remarks = temp = pressure = humidity=movement=environment=date ="";
                productSerial = 0;
            }
        }
        console.log(JSON.stringify(dict,null,2))
        res.json(dict);
    }).catch((err)=>{
        console.log(err);
    })
})



router.get("/queryEnvironmentStatus",(req,res,next)=>{

    const orderIndex = toHex(11);
    const blockNumber="";
  
    var promises = [];
    var counter = 0;

    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        const StorageLength = web3.utils.toDecimal(results.result);
        for(var i = 0; i<StorageLength;i++){
            for(var k = 0; k < 7; k++){
                var newKey = web3.utils.sha3(orderIndex);
                newKey = increaseHexByOne(newKey,counter);
                counter++;
                promises.push(rpt(GetStorageAtWithRetry(readContractAddress(),newKey,"latest")));
            }
        }
        return Promise.all(promises);
    }).then((AllResults)=>{
        console.log(AllResults)
        var productSerial = 0;

        var dict = [];
        var remarks;
        var date;
        var pressure;
        var lat;
        var long;
        var temp;
        var humidity;

        for(var i =0; i<AllResults.length;i++)
        {
            if(productSerial == 0)
            {
                
                console.log("Remarks - " +replaceText(web3.utils.toAscii(AllResults[i].result)));
                remarks =  replaceText(web3.utils.toAscii(AllResults[i].result))
                productSerial++;
            }
            else if(productSerial == 1)
            {
                console.log(AllResults[i])
                console.log("Date - " + web3.utils.toAscii(AllResults[i].result));
                date =  web3.utils.toAscii(AllResults[i].result);
                productSerial++;
            }
            else if(productSerial == 2)
            {
                console.log("Pressure - " + web3.utils.toAscii(AllResults[i].result));
                pressure =replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 3)
            {
                console.log("Latitude - " + web3.utils.toAscii(AllResults[i].result));
                lat = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 4)
            {
                console.log("Longitude - " + web3.utils.toAscii(AllResults[i].result));
                long = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 5)
            {
                console.log("Temperature - " + web3.utils.toAscii(AllResults[i].result));
                temp = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
            else if(productSerial == 6)
            {
                console.log("Humidity - " + web3.utils.toAscii(AllResults[i].result));
                humidity = replaceText(web3.utils.toAscii(AllResults[i].result));

                dict.push({
                    "Remarks" : remarks,
                    "Date" : date,
                    "Pressure" : pressure,
                    "Latitude" : lat,
                    "Longitude" : long,
                    "Temperature" : temp,
                    "Humidity" : humidity,
                });
                remarks = date = temp = pressure = lat = long = humidity ="";
                productSerial = 0;
            }
        }
    console.log(JSON.stringify(dict,null,2))
        res.json(dict);
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/queryMovementStatus",(req,res,next)=>{

    const orderIndex = toHex(12);
    const blockNumber="";
  
    var promises = [];
    var counter = 0;

    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest")
    rp(storage).then((results)=>{
        const StorageLength = web3.utils.toDecimal(results.result);
        for(var i = 0; i<StorageLength;i++){
            for(var k = 0; k < 4; k++){
                var newKey = web3.utils.sha3(orderIndex);
                newKey = increaseHexByOne(newKey,counter);
                counter++;
                promises.push(rpt(GetStorageAtWithRetry(readContractAddress(),newKey,"latest")));
            }
        }
        return Promise.all(promises);
    }).then((AllResults)=>{
        console.log(AllResults)
        var productSerial = 0;

        var dict = [];
        var remarks;
        var date;

        var lat;
        var long;

        for(var i =0; i<AllResults.length;i++)
        {
            if(productSerial == 0)
            {
                
                console.log("Remarks - " +replaceText(web3.utils.toAscii(AllResults[i].result)));
                remarks =  replaceText(web3.utils.toAscii(AllResults[i].result))
                productSerial++;
            }
            else if(productSerial == 1)
            {
                console.log(AllResults[i])
                console.log("Date - " + web3.utils.toAscii(AllResults[i].result));
                date =  web3.utils.toAscii(AllResults[i].result);
                productSerial++;
            }
            else if(productSerial == 2)
            {
                console.log("Latitude - " + web3.utils.toAscii(AllResults[i].result));
                lat = replaceText(web3.utils.toAscii(AllResults[i].result));
                productSerial++;
            }
   
            else if(productSerial == 3)
            {
                console.log("Longitude - " + web3.utils.toAscii(AllResults[i].result));
                long = replaceText(web3.utils.toAscii(AllResults[i].result));

                dict.push({
                    "Remarks" : remarks,
                    "Date" : date,
                    "Latitude" : lat,
                    "Longitude" : long,
                });
                remarks = date  = lat = long  ="";
                productSerial = 0;
            }
        }
    console.log(JSON.stringify(dict,null,2))
        res.json(dict);
    }).catch((err)=>{
        console.log(err);
    })
})


router.get("/getCurrentDeliveryState",(req,res,next)=>{
    const orderIndex = toHex(13);
    const DeliveryStatus =['Awaiting Delivery','Awaiting Payment','Complete']
    var sendResponseCode;
    var storage = GetStorageAt(readContractAddress(),orderIndex,"latest");
    rp(storage).then((results)=>{

        const DeliveryStatusCode = web3.utils.hexToNumber(results.result);

        if(DeliveryStatusCode == 0){
            sendResponseCode = DeliveryStatus[0];
        }
        else if(DeliveryStatusCode == 1){
            sendResponseCode = DeliveryStatus[1];
        }
        else if(DeliveryStatusCode == 2){
            sendResponseCode = DeliveryStatus[2];
        }

       res.status(200).send(sendResponseCode);
    }).catch((err)=>{
        console.log(err);
    })
})





// Download Video
// example encoded id -  TVRCdGFXNXpNVEl4TWpFNA==

// docker path /usr/bin/python
// mac path /usr/local/bin/python

router.get("/downloadVideo",(req,res,next)=>{

    const videoEncodedID = req.query.id;
  
    // python options
    let options  = {
        mode: 'text',
        pythonPath: PYTHONPATH,
        scriptPath: __dirname+"/../../python/",
        args:[videoEncodedID]
    }

    PythonShell.run('pythonDecoder.py',options,(err,results)=>{
        const decoded_video_filename = results[0] +".mp4";
        if(err) {
            res.status(404).send("Video ID is invalid");
        };
        rp(RETRIEVE_VIDEO+`/api/values/${decoded_video_filename}`).then((video_results)=>{

            res.download(`/app/video/${decoded_video_filename}`,(err)=>{
                if(err){
                    console.log(err)
                    res.status(404).send("File not found");
                }
            });

        }).catch((err)=>{
            res.status(500).send(err);
        })
    })
})



module.exports = router;