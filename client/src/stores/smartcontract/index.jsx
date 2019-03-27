import {observable,action} from 'mobx';
import HTTPClient from 'services/HTTPClient';
import * as fs from 'fs-web';

class SmartContractStore{

    @observable Transaction =[]

    @action CreateNewContract(Address){
        // console.log(Transaction)
        return HTTPClient.Post(`transaction/deployContract`,Address)
            .then((res)=>{
                console.log("Updated successfully - " + (res.data.ContractAddress))
                return res.data.ContractAddress;
            });
    }

    @action SendTransaction(Transaction){
        return HTTPClient.Post(`transaction/sendTransaction`,Transaction)
            .then((res)=>{
                console.log("Transaction sent successfully - " + res.data);
                return res.data;
            })
    }

    @action TransferOwnership(Addresses){
        return HTTPClient.Post(`transaction/transferOwnership`,Addresses)
            .then((res)=>{
                console.log("Ownership data sent successfully - " +res.data);
                return res.data;
            })
    }
    
    @action SendPayment(Payment){
        return HTTPClient.Post(`transaction/sendPayment`,Payment)
            .then((res)=>{
                console.log("Payment sent successfully - "+ res.data);
                return res.data;
            })
    }



 

}

const smartContractStore = new SmartContractStore();
export default smartContractStore;