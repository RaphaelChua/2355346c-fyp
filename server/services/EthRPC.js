var config = require('nconf');
const SETH_RPC = config.get("SETH_RPC_PORT");
const HOST = config.get("SETH_RPC_HOST");
const REQUESTURL = "http://" + HOST + ":" + SETH_RPC;

const headers = {
    'Content-Type' : 'application/json'
};
var dataString = "";
var options = {};

function AccountInfo(eth_methods){

    dataString  = {"jsonrpc":"2.0","method":eth_methods,"id": 1, "params": []};
    options = {
        url: REQUESTURL,
        method:'POST',
        headers:headers,
        body: dataString,
        json: true
    };
    return options;
}

function UnlockAccount(eth_methods,eth_accountID,eth_accountPassword,eth_accountDuration){

    dataString = {"jsonrpc":"2.0","method":eth_methods,"id":2,"params":[eth_accountID,eth_accountPassword,eth_accountDuration]};
    options = {
        url: REQUESTURL,
        method:'POST',
        headers:headers,
        body: dataString,
        json: true
    };
    return options;
}


module.exports={
    AccountInfo,
    UnlockAccount,
};
