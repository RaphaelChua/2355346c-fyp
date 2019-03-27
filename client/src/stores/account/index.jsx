import { observable, action } from 'mobx';
import HTTPClient from 'services/HTTPClient';

class AccountStore{


    @observable accountAddr ="";
    @observable contractAddr ="";
    @observable contractABI ={}


    @action GetAccountAddress(){
        return HTTPClient.Get(`account/getAccountAddress`)
            .then((res)=>{
                this.accountAddr = res.data;
            })
    }

    @action GetContractAddress(){
        return HTTPClient.Get(`contract/getContractAddress`)
            .then((res)=>{
                this.contractAddr = res.data;
            })
    }

    @action GetContractABI(){
        return HTTPClient.Get(`contract/getContractABI`)
            .then((res)=>{
                this.contractABI = res.data
            })
    }

}

const accountStore = new AccountStore();
export default accountStore;