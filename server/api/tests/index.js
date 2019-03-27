'use strict';

// Test api

import {Router} from 'express';
var abi = require('ethereumjs-abi')
var txDecoder = require('ethereum-tx-decoder');
const router = Router();
import Web3 from 'web3';
const utilss = require('ethjs-util');
const ethTx = require('ethereumjs-tx');
var web3 = new Web3();
var config = require('nconf');
var cbor = require('cbor');
const rp = require('request-promise');
const SETHRPCPORT = config.get("SETH_RPC_PORT");
const SETHRPCHOST = config.get("SETH_RPC_HOST");
const SETHPROVIDER = "http://"+SETHRPCHOST+":"+SETHRPCPORT;
import {AccountInfo,UnlockAccount} from '../../services/EthRPC';
import {GetNonceBalanceAt,GetNonceAt,GetTransactionReceipt,GetTransactionByHash} from '../../services/ContractInfo';
import {
    readContractAddress,
    readContractABI,
    getNonceBalance,
    hex2ascii
} from '../../component/utils.js';
// curl -vX POST -d @sample_JSON/sample.json -H "Content-Type: application/json" http://localhost:5000/api/tests/sensordata123
web3.setProvider(new web3.providers.HttpProvider(SETHPROVIDER));
//test connection 
router.post("/testConnection" , (req,res,next) =>{
    const obj = req.body;
    console.log(JSON.stringify(obj,null,2))
    res.status(200).send(JSON.stringify(obj,null,2))
});

router.get("/getBalance", (req,res,next) => {
    rp(AccountInfo("eth_accounts")).then((account)=>{
        console.log(account)
        var Personal_Account = account.result[0];
        console.log(Personal_Account)
        // var nonce = getNonceBalance(Personal_Account)
        // console.log(nonce)
    //  var nonce = 
    return rp(GetNonceAt(Personal_Account));
    }).then((nonce)=>{
        console.log(nonce.result);
        var num = web3.utils.hexToNumber(nonce.result);
        console.log(num);
        res.send(num.toString());
        // GetNonceAt
    })
})

router.get("/decode",(req,res,next)=>{
    const text = "CAMiywUIDhCAwMrzhKMCGJC/BSIUn9YBfb5uLFhnYegS/HSxtzKeQg4ypAU+/hCiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEkNoYW5naSB0byBCcmFkZGVsbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQzMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAENDAuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABjEwMTEuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR0cnVlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEdHJ1ZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACjE1NDcwMTIzOTgAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    var decodedtext = new Buffer(text, 'base64').toString('ascii')

    // var decoded = abi.simpleDecode("balanceOf(address):(uint256)", decodedtext)
    console.log(decodedtext)
    // try{
    //     var fnDecoder = new txDecoder.FunctionDecoder(readContractABI());


    //     var newd = fnDecoder.decodeFn(text.data);;
    //     console.log(newd)
    var cbordecode = cbor.decode(decodedtext);
    // }
    // catch(ex)
    // {
    //     console.log(ex)
    // }
    // console.log(cbordecode)
    // // res.send(cbordecode);

})

router.get("/getreceipt",(req,res,next)=>{
//0x94cbb3f173488c43bbf971f3a962fc2403dd55e37a44ba486ab9ea55d719d4d753e992193e44ca1100ae6921d1ea4b2e97264fe90db589befa22a66defc87300
    const tx = "0x3e495e8abf3123296a5c896a56fbf984a7343f3f9009fec4840183a61abcdd4b0b063a1d0d694f0b5edaf22304f3b27e59f7633becec2693e41050fcbc8fcf54"
    rp(GetTransactionByHash(tx)).then((results)=>{
        console.log(utilss(results.input));
    })
})

module.exports = router;