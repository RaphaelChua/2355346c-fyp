
const fs = require('fs');
const Web3 = require('web3');
var config = require('nconf');
const solc = require('solc');
const rp = require('request-promise');
const SETH_RPC = config.get("SETH_RPC_PORT");
const HOST = config.get("SETH_RPC_HOST");
const REQUESTURL = "http://" + HOST + ":" + SETH_RPC;

const headers = {
	'Content-Type' : 'application/json',
	'Connection': 'keep-alive',
};

const headers2 = {
	'Content-Type' : 'application/json',
	'Connection': 'keep-alive',
	'User-Agent': 'Request-Promise'
};

var dataString = "";
var options = {};
function CompileContract(){

var input = {
	language: 'Solidity',
	sources: {
		'HalalFood.sol': {
			content: fs.readFileSync(__dirname+"/contracts/HalalFood.sol",'utf-8')
		}
	},
	settings: {
		outputSelection: {
			'*': {
				'*': [ '*' ]
			}
		}
	}
}

var output = JSON.parse(solc.compile(JSON.stringify(input)))
console.log(output);
var contractoutput = '';
var abi = '';
for (var contractname in output.contracts['HalalFood.sol']){
    contractoutput = '0x' + output.contracts['HalalFood.sol'][contractname].evm.bytecode.object;
    abi = output.contracts['HalalFood.sol'][contractname].abi;
    
}
var ContractBytecode ={
	bytecode:contractoutput,
	abi : abi
}


fs.writeFileSync(__dirname+'/contracts/compiled/HalalFood_bytecode.json',JSON.stringify(ContractBytecode,null,1));
fs.writeFileSync(__dirname+'/contracts/compiled/HalalFood_abi.json',JSON.stringify(abi,null,1));


return(ContractBytecode);

}


// Takes in the accoount address &
// Bytecode of the compiled contract together with any parameters
function DeployContract(eth_accountAddr,eth_bytecode){

	// if( typeof eth_arguments != undefined)
	// {
	// 	var _arguments = eth_arguments;
	// }
	dataString = {"jsonrpc":"2.0","method":"eth_sendTransaction","id":1,"params":[{
		"from": eth_accountAddr,
		"data":eth_bytecode,

	}]}
	options = {
        url: REQUESTURL,
        method:'POST',
        headers:headers,
        body: dataString,
        json: true
	}
	return options;
}
function GetTransactionReceipt(eth_transactionHash){
	dataString = {"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":[eth_transactionHash],"id":1};
	options = {
        url: REQUESTURL,
        method:'POST',
        headers:headers,
        body: dataString,
        json: true
	}
	return options;
}

function GetTransactionByHash(eth_transactionHash){
	dataString = {"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":[eth_transactionHash],"id":1};
	options = {
        url: REQUESTURL,
        method:'POST',
        headers:headers,
        body: dataString,
        json: true
	}
	return options;
}

// Takes in contract address & 
// Index position of the variables in the smart contract &
// Block number position or ("latest","earliest")
function GetStorageAt(eth_contractAddr,eth_position,eth_blocknum){

	dataString = {"jsonrpc":"2.0","id":1,"method":"eth_getStorageAt","params":[eth_contractAddr,eth_position,eth_blocknum]};
	options = {
        url: REQUESTURL,
        method:'POST',
        headers:headers,
        body: dataString,
        json: true
	};
	return options;
}

function GetStorageAtWithRetry(eth_contractAddr,eth_position,eth_blocknum){

	dataString = {"jsonrpc":"2.0","id":1,"method":"eth_getStorageAt","params":[eth_contractAddr,eth_position,eth_blocknum]};
	options = {
        url: REQUESTURL,
        method:'POST',
        headers:headers2,
        body: dataString,
		json: true,
		retry : 50, // will retry the call, in case of error.
		verbose_logging : false // will log errors only, if set to be true, will log all actions
	};
	return options;
}

function GetNonceAt(eth_accountAddr){

	dataString = {"jsonrpc":"2.0","id":1,"method":"eth_getTransactionCount","params":[eth_accountAddr,"latest"]};
	options =  {
		url: REQUESTURL,
        method:'POST',
        headers:headers,
        body: dataString,
        json: true
	}
	return options;

}

function  GetNonceBalanceAt(eth_accountAddr){
	rp(GetNonceAt(eth_accountAddr)).then((nonce)=>{
		console.log("HEY"+nonce.result)
		var AccountNonce = nonce.result;
		return AccountNonce;
	})
}


module.exports = {
	CompileContract,
	DeployContract,
	GetStorageAt,
	GetStorageAtWithRetry,
	GetTransactionReceipt,
	GetNonceBalanceAt,
	GetTransactionByHash,
	GetNonceAt };