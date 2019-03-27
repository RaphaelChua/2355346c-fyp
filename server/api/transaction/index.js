'use strict';

import {Router} from 'express';
import Web3 from 'web3';
var web3 = new Web3();
import fs from 'fs';
import {CompileContract,GetStorageAt} from '../../services/ContractInfo';
import {AccountInfo,UnlockAccount} from '../../services/EthRPC';
import {TransactionBuilder} from '../../services/TransactionBuilder';
var config = require('nconf');
const rp = require('request-promise');
import {GetNonceAt} from '../../services/ContractInfo';

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

import {
    increaseHexByOne,
    convertToAddress,
    toHex,
    roundDownOneDec,
    readContractAddress,
    readContractABI,
} from '../../component/utils.js';


var nonce_counter=0;

// Set web3 provider
web3.setProvider(new web3.providers.HttpProvider(SETHPROVIDER));


var BN = web3.utils.BN;
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    })
}

async function WriteToFile(data){
    fs.writeFileSync(__dirname+"/../../contract_address/ContractAddress.json",
    JSON.stringify({
     ContractAddress:data
    },null,2));
    
    await sleep(3000)
}

// Global Variable State
var Personal_Account=""; // externally owned account
// var Global_Contract_Address="";
let New_Contract;
var nonce_counter;

let ContractABI = new web3.eth.Contract(readContractABI());

// ======= API =======

router.post("/deployContract",(req,res,next)=>{   

    //get the json data.
    const data = req.body
   
    const supplier = data.SupplierName;
    const consumer = data.ConsumerName;
    const thirdpartylogistics = data.ThirdPartyLogisticsName;
    const distributor = data.DistributorName;


    // Get the bytecode and application binary interface from the contract
    let compiled = CompileContract();

    const bytecode = compiled.bytecode; //
    const abi = compiled.abi;

    New_Contract = new web3.eth.Contract(abi);

    rp(AccountInfo("eth_accounts")).then((account)=>{
        Personal_Account = account.result[0];
        console.log(Personal_Account)
        return rp(GetNonceAt(Personal_Account));
    }).then((nonce)=>{
        var num = web3.utils.hexToNumber(nonce.result);
        nonce_counter = num
        if(distributor != Personal_Account){
            res.status(404).send("Not the correct account");
            return null;
        }
        else{
        // Unlock account to be able to send a transaction.
        var unlocked_acc_address = UnlockAccount("personal_unlockAccount",Personal_Account.substring(2),null,null);
        return rp(unlocked_acc_address)
        }
    }).then((account_status)=>{
        if(account_status != null){
        New_Contract.deploy({
        data: bytecode,
        arguments: [supplier,distributor,thirdpartylogistics,consumer]
       }).send({
           from: Personal_Account,
       }).then((instance)=>{
        var contract_address = instance.options.address.toLocaleLowerCase(); // make contract to all lower case
        New_Contract.options.address = contract_address; // assign new contract address 
        New_Contract.options.jsonInterface = abi; // assign new contract abi
        // Global_Contract_Address = contract_address;
        console.log("Contract mined at " + contract_address); 
        // save contract address
        WriteToFile(contract_address)
        res.status(200).json({ ContractAddress:contract_address ,message:`Contract mined at ${contract_address}`});    
       }).catch(console.log);
    }
    }).catch(console.log);
});

router.post("/sendTransaction",(req,res,next)=>{

    //get the json data.
    const data = req.body;
    const contractaddrs = readContractAddress(); //get contract address
    const _orderid = 1001;
    const _productbatchid = ProductBatchID.generate(); //generate product batch id
    const Orders = {
        name:data.OrderName,
        qty:data.OrderQty
    }
    console.log(Orders);

    // Build the transaction
    let build_tx = New_Contract.methods.createOrders(Personal_Account,_orderid,_productbatchid,Orders.name,Orders.qty);
    // Encode the transaction
    let encode_tx = build_tx.encodeABI();
    nonce_counter++;
  // Unlock account to be able to send a transaction.
    rp(UnlockAccount("personal_unlockAccount",Personal_Account.substring(2),null,null)).then(()=>{
        return rp(TransactionBuilder("eth_sendTransaction",Personal_Account,encode_tx,contractaddrs,nonce_counter));
  }).then((results)=>{
        res.status(200).send("Success");
        console.log("Transaction Receipt Hash - "+results.result);
  }).catch((err)=>{
      console.log(err);
  })
});

router.post("/sendPayment",(req,res,next)=>{
    
    //get the json data.
    const data = req.body;
    const price = data.Price;
    const consumerAddress = data.ConsumerName;
    console.log(data);

    let build_tx = New_Contract.methods.confirmPayment(consumerAddress,price)
    let encode_tx = build_tx.encodeABI();

    nonce_counter++;
    
    rp(UnlockAccount("personal_unlockAccount",Personal_Account.substring(2),null,null)).then(()=>{
        return rp(TransactionBuilder("eth_sendTransaction",Personal_Account,encode_tx,readContractAddress(),nonce_counter))
    }).then((results)=>{
        res.status(200).send("Payment confirmed");
        console.log("Success? - "+JSON.stringify(results));
    }).catch((err)=>{
        console.log(err);
    })

})

router.post("/transferOwnership",(req,res,next)=>{
    
    //get the json data
    const data = req.body;
    const Distributor = data.DistributorName;
    const Consumer = data.ConsumerName;
    if(Distributor == Personal_Account){
      // Build the transaction
      let build_tx = New_Contract.methods.transferOwnership(Personal_Account,Consumer);
      // Encode the transaction
      let encode_tx = build_tx.encodeABI();

      nonce_counter++;

    rp(UnlockAccount("personal_unlockAccount",Personal_Account.substring(2),null,null)).then(()=>{
        return rp(TransactionBuilder("eth_sendTransaction",Personal_Account,encode_tx,readContractAddress(),nonce_counter));
  }).then(()=>{
      res.status(200).send("Ownership of contract is transferred");
  })
    }
    else{
        res.sendStatus(404);
    }

})
router.post("/confirmDelivery",(req,res,next)=>{
    const data = req.body;
    const ConsumerAddr = data.ConsumerAddress;
    console.log(ConsumerAddr)
    try{
    let build_tx = ContractABI.methods.confirmDelivery(ConsumerAddr);
    let encode_tx = build_tx.encodeABI();

    // nonce_counter++;

    rp(UnlockAccount("personal_unlockAccount",Personal_Account.substring(2),null,null)).then((result1)=>{
        console.log(result1);
        return rp(GetNonceAt(Personal_Account))
    }).then((nonce)=>{
        var num = web3.utils.hexToNumber(nonce.result);
        return rp(TransactionBuilder("eth_sendTransaction",Personal_Account,encode_tx,readContractAddress(),num));
  }).then((results)=>{
      console.log(results);
      res.status(200).send("Delivery is confirmed");
  }).catch((err)=>{
      console.log(err);
  })
}
catch(errs){
    console.log(errs)
}

    
})




module.exports = router;