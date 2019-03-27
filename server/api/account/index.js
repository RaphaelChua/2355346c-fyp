'use strict';

import {Router} from 'express';
import AccountBuilder from '../../services/AccountBuilder';
import ContractInfo from '../../services/ContractInfo';
import {AccountInfo,UnlockAccount} from '../../services/EthRPC';
var config = require('nconf');
const request = require('request');
const rp = require('request-promise');
const router = Router();
const RESTAPI = config.get("SAWTOOTH_RESTAPI");
const HOST = config.get("SAWTOOTH_NETWORK_HOST");
const REQUESTURL = "http://" + HOST + ":" + RESTAPI;



router.get("/getAccountAddress",(req,res,next)=>{

    const options = AccountInfo("eth_accounts")
    rp(options).then((results)=>{
        //get account address
        res.status(200).send(results.result[0])
        
    }).catch((err)=>{
        res.status(404).send("Account not found - " + err)
    });

});

router.get("/unlockAccount",(req,res,next)=>{

    //get account address
    const options = AccountInfo("eth_accounts");
    rp(options).then((results)=>{
        //unlock account address
        const options2 = UnlockAccount("personal_unlockAccount",
        results.result[0].substring(2),
        "None",0)
        rp(options2).then((results2)=>{
            res.status(200).send("Unlock account successful - " + results.result[0]
            +" \n " + JSON.stringify(results2));
        }).catch((err)=>{
            res.status(404).send("Account not unlock - "+err);
        })
    }).catch((err)=>{
        res.status(404).send("Account not found - "+err);
    })
})



module.exports = router;