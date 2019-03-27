import Web3 from 'web3';
const util = require('ethereumjs-util');
var web3 = new Web3();

var config = require('nconf');
const rp = require('request-promise');
const SETHRPCPORT = config.get("SETH_RPC_PORT");
const SETHRPCHOST = config.get("SETH_RPC_HOST");
const SETHPROVIDER = "http://"+SETHRPCHOST+":"+SETHRPCPORT;
var BN = web3.utils.BN;
import fs from 'fs';

function increaseHexByOne(hex,num) {
    try{
    let x = web3.utils.toBN(hex.toString()).add(new BN(num.toString()))
    x = d2h(x);
    let result = '0x' + x
    return result
    }
    catch(err){
        console.log(err)
    }
   }

function toHex(buffer){
    return util.bufferToHex(util.setLengthLeft(buffer,32));
}
function convertToAddress(hexAddr){
    return "0x"+ hexAddr.substring(26); //convert 32bit hex to ethereum address.
}
function roundDownOneDec(dec){
    return Math.round(dec*10)/10;
}
function readContractAddress(){
    const jsondata = JSON.parse(fs.readFileSync(__dirname+"/../contract_address/ContractAddress.json","utf-8"));
    return jsondata.ContractAddress;
}
function readContractABI(){
    const jsondata = JSON.parse(fs.readFileSync(__dirname+"/../services/contracts/compiled/HalalFood_abi.json"));
    return jsondata;
}

function hex2ascii(hex) {
    var hexStr = Buffer.from(hex,'hex');
    return hexStr.toString('ascii')
}

function ascii2hex(str){
    var bufStr = Buffer.from(str, 'ascii');
    return bufStr.toString('hex');
}

function getNonceBalance(addr){
    var nonce = web3.eth.getTransactionCount(addr, "latest");
    return nonce;
}

function convertEpoch(unixTimeStamp){
    var getInt = parseInt(unixTimeStamp);
    var date = new Date(getInt*1000);
    console.log(date);
    var day = date.getDay();
    var month = date.getMonth();
    var year =  date.getFullYear();
    var newDate = date.getUTCDate()
    return date.toString();
}



// Internal Function

//pad 0 to make it 64 bytes
function d2h(d) {
    var s = d.toString(16);
    while(true){
    if(s.length < 64) {
        s = '0' + s;
    }
    else if(s.length == 64)
    {
        break;
    }
}
    return s;
}

module.exports={
    toHex,
    convertToAddress,
    roundDownOneDec,
    hex2ascii,
    ascii2hex,
    increaseHexByOne,
    readContractAddress,
    readContractABI,
    getNonceBalance,
    convertEpoch
}