'use strict';

import {Router} from 'express';
import fs from 'fs';
import Web3 from 'web3';
import {TransactionBuilder} from '../../services/TransactionBuilder';
import {AccountInfo,UnlockAccount} from '../../services/EthRPC';
var web3 = new Web3();
var config = require('nconf');
const rp = require('request-promise');
const util = require('ethereumjs-util');
const router = Router();
const RESTAPI = config.get("SAWTOOTH_RESTAPI");
const HOST = config.get("SERVER_NAME");
const REQUESTURL = "http://" + HOST + ":" + RESTAPI;

const SETHRPCPORT = config.get("SETH_RPC_PORT");
const SETHRPCHOST = config.get("SETH_RPC_HOST");
const SETHPROVIDER = "http://"+SETHRPCHOST+":"+SETHRPCPORT;

import {
    readContractAddress,
    readContractABI,
} from '../../component/utils.js';


// Set web3 provider
web3.setProvider(new web3.providers.HttpProvider(SETHPROVIDER));

// Global Variable State
let New_Location;
let Personal_Account;

// ======= API =======

//curl command - curl -X POST -d '{}' -H "Content-Type:application/json" http://localhost:3000/api/location/updateLocation
router.post("/updateLocation",(req,res,next)=>{
    
    //get the json data and current location
    const data = req.body;
    const location = data.currentLocation;
    //get current date
    const date = Math.floor(new Date() / 1000)

    // Invoke method from contract
    const abi = readContractABI();
    // console.log(abi)
    const contractAddress = readContractAddress();
    New_Location = new web3.eth.Contract(abi);
    let build_tx;
    let encode_tx;

    rp(AccountInfo("eth_accounts")).then((account)=>{
        Personal_Account = account.result[0];
         // Build the transaction
        build_tx = New_Location.methods.updateLocation(Personal_Account,location,date);
        // Encode the transaction
        encode_tx = build_tx.encodeABI();

        var unlocked_acc_address = UnlockAccount("personal_unlockAccount",Personal_Account.substring(2),null,null);
        return rp(unlocked_acc_address)
    }).then(()=>{
        return rp(TransactionBuilder("eth_sendTransaction",Personal_Account,encode_tx,contractAddress))
    }).then((results)=>{
        console.log(results);
        res.status(200).send(`Updated Location - ${location}`);
    }).catch((err)=>{
        if(err){
            console.log(err)
        }
    })
})








module.exports = router;