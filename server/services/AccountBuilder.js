var config = require('nconf');
const SETH_RPC = config.get("SETH_RPC");
const HOST = config.get("SERVER_NAME");
const REQUESTURL = "http://" + HOST + ":" + SETH_RPC;

const headers = {
    'Content-Type' : 'application/json'
};
var options = {};
function AccountBuilder(eth_methods,eth_from,eth_password,eth_time){
    var dataString  = {"jsonrpc":"2.0","method":eth_methods,"id": 2, "params": [eth_from,eth_password,eth_time]};
    options = {
        url: REQUESTURL,
        method:'POST',
        headers:headers,
        body: dataString,
        json: true
    }
    return options;
}

module.exports = AccountBuilder;
