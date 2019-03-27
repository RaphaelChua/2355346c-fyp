import {Router} from 'express';
import Web3 from 'web3';
var web3 = new Web3();
import {AccountInfo,UnlockAccount} from '../../services/EthRPC';
import {TransactionBuilder} from '../../services/TransactionBuilder';
var config = require('nconf');
const rp = require('request-promise');
import {GetNonceAt} from '../../services/ContractInfo';
const router = Router();


import {
    readContractAddress,
    readContractABI,
} from '../../component/utils.js';
// Global Variable State
var Personal_Account=""; // externally owned account
// var Global_Contract_Address="";
let New_Contract;
New_Contract = new web3.eth.Contract(readContractABI());

// curl --max-time 900 -vX POST -d @server/sample_JSON/sample.json -H "Content-Type: application/json" http://localhost:5000/api/sensors/sensorsData


var nonce_counter  = 0;
var nonce_recount = 0;

router.post("/sensorsData" , (req,res,next)=>{
    // Get the json data
    const data = req.body;
    const currentStatus = data.status;

    // Map the json data to a variable
    const video_hashID = data.video_hashID;
    const video_filename_encodeID = data.video_filename_encodeID;
    const remarks = data.remarks;

    //spilts the 64 char video
    //first video 21, second video 21, third video 22
    const firstpart = video_hashID.substring(0,21);
    const secondpart = video_hashID.substring(21,42);
    const thirdpart = video_hashID.substring(42,64);

    console.log("Video hash = "+firstpart+secondpart+thirdpart)

    const partOfHashID = []
    partOfHashID.push(firstpart);
    partOfHashID.push(secondpart);
    partOfHashID.push(thirdpart);

    let encode_updateStatusTX;
    let uploadStatusInfo;
    let uploadEnvStatus;
    let uploadMovementStatus;
 
    rp(AccountInfo("eth_accounts")).then((account)=>{
        Personal_Account = account.result[0];
        let build_updateStatusTX = New_Contract.methods.updateStatus(remarks,partOfHashID[0],partOfHashID[1],partOfHashID[2],video_filename_encodeID);
        encode_updateStatusTX = build_updateStatusTX.encodeABI();

        var unlocked_acc_address = UnlockAccount("personal_unlockAccount",Personal_Account.substring(2),null,null);
        return rp(unlocked_acc_address);
    }).then(()=>{
        return rp(GetNonceAt(Personal_Account));
    }).then((nonce)=>{
        //get current nonce of the blockchain
        var setNonceTo = web3.utils.hexToNumber(nonce.result);
        //update the global nonce.
        nonce_counter =setNonceTo;
        console.log("Current state/nonce of blockchain - " + nonce_counter);
        var statusupdate = TransactionBuilder("eth_sendTransaction",Personal_Account,encode_updateStatusTX,readContractAddress(),nonce_counter);
        return rp(statusupdate);
    }).then(()=>{

        // Assign input parameters to each contract function arguments and preset their nonces respectively
        if(currentStatus.length != 0){
            uploadStatusInfo = sendStatusInfo(currentStatus,remarks);
        }
        if(data.env_status.length != 0){
            uploadEnvStatus = sendEnvStatus(data.env_status,remarks);
        }
        if(data.movement_status.length != 0){
            uploadMovementStatus = sendMoveStatus(data.movement_status,remarks);
        }

        // Concat their results into an array.
        const concatPromises = [...uploadStatusInfo,...uploadEnvStatus,...uploadMovementStatus];

        // Send all the pre-built transactions to the blockchain for verification.
        var results =  unresolvePromise(concatPromises);
        return results;
    }).then(()=>{
        console.log("done!");

        res.sendStatus(200);
    })

});

const delay = ms => new Promise(resolve => setTimeout(resolve,ms));

async function unresolvePromise(promises){
    var results = Promise.resolve();
    var transactionCount = 0;
    for(let action of promises){

        // ============ Delay of Transaction ============
        await delay(0)
        // ============ Delay of Transaction ============

        results = await resolvePromise(action);
        transactionCount++;
        console.log("Transaction Counts: "+transactionCount);

        // if(transactionCount == 200)
        // {
        //     console.log("Waiting for transaction...")
        //     await delay(60000)
        //     transactionCount = 0;
        //     console.log("Restarting tansaction count...")
        // }
    }
    return results;
}

async function resolvePromise(promise){
    await rp(promise).then(async(task)=>{
        // Recursion for failed transaction due to unresponsive transaction processor
        if(task.result==undefined){
            console.log("Retrying transaction ...")
            // console.log (task);
            await delay (1000)
            return resolvePromise(promise);
        }
        else{
            console.log("Transaction Receipt Hash - "+task.result)
        }
    })
}

function sendStatusInfo(data,remarks){
    var arrayPromises =[];
    data.forEach((dataItems)=>{
     let build_updateStatusInfoTX = "";
     let encode_updateStatusInfoTX = "";
     var temp = dataItems.temperature;
     var humidity = dataItems.humidity;
     var pressure = dataItems.pressure;
     var movement = dataItems.movement_detected.toString();
     var environment = dataItems.environment_changed.toString();
     var date = dataItems.datetime;
     nonce_counter ++;
     console.log("StatusInfo nonce = " +nonce_counter);

     build_updateStatusInfoTX = New_Contract.methods.updateStatusInformation(remarks,temp,humidity,pressure,movement,environment,date);
     encode_updateStatusInfoTX = build_updateStatusInfoTX.encodeABI();
     arrayPromises.push(TransactionBuilder("eth_sendTransaction",Personal_Account,encode_updateStatusInfoTX,readContractAddress(),nonce_counter));
    });
    return arrayPromises;
}

function sendMoveStatus(data,remarks){
    var arrayPromises =[];
    data.forEach((dataItems)=>{
    let build_updateMovementStatusTX = "";
    let encode_updateMovementStatusTX = "";
    var date = dataItems.datetime;
    var lat = dataItems.lat;
    var long = dataItems.long;
    nonce_counter ++;
    console.log("MoveStatus nonce = " +nonce_counter);
    build_updateMovementStatusTX = New_Contract.methods.updateMovementStatus(date,lat,long,remarks);
    encode_updateMovementStatusTX = build_updateMovementStatusTX.encodeABI();
    arrayPromises.push(TransactionBuilder("eth_sendTransaction",Personal_Account,encode_updateMovementStatusTX,readContractAddress(),nonce_counter));
    
})
return arrayPromises;
}
function sendEnvStatus(data,remarks){
    var arrayPromises =[]
    data.forEach((dataItems)=>{
    let build_updateEnvironmentStatusTX ="";  
    let encode_updateEnvironmentStatusTX = "";
    var date = dataItems.datetime;
    var pressure = dataItems.pressure;
    var lat = dataItems.lat;
    var long = dataItems.long;
    var temperature = dataItems.temperature;
    var humidity = dataItems.humidity;
    nonce_counter ++;
    console.log("EnvStatus nonce = " +nonce_counter);
    build_updateEnvironmentStatusTX = New_Contract.methods.updateEnvironmentStatus(date,remarks,pressure,temperature,humidity,lat,long);
    encode_updateEnvironmentStatusTX = build_updateEnvironmentStatusTX.encodeABI();
    arrayPromises.push(TransactionBuilder("eth_sendTransaction",Personal_Account,encode_updateEnvironmentStatusTX,readContractAddress(),nonce_counter));
})
return arrayPromises;
}


module.exports = router;