var config = require('nconf');
const SETH_RPC = config.get("SETH_RPC_PORT");
const HOST = config.get("SETH_RPC_HOST");
const REQUESTURL = "http://" + HOST + ":" + "3030";
import Web3 from 'web3';
var web3 = new Web3();

const headers = {
    'Content-Type' : 'application/json'
};
var options = {};
function TransactionBuilder(eth_methods,eth_from,eth_data,eth_to,eth_nonce){
    var dataString  = {"jsonrpc":"2.0","method":eth_methods,"id": 2, "params": [{"from":eth_from,"data":eth_data,"to":eth_to,"nonce":web3.utils.toHex(eth_nonce)}]};
    options = {
        url: REQUESTURL,
        method:'POST',
        headers:headers,
        body: dataString,
        json: true
    }
    return options;
}

module.exports = {TransactionBuilder};
