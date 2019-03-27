import {observable,action, transaction} from 'mobx';
import HTTPClient from 'services/HTTPClient';

class TransactionStore{

    @observable Transaction =[]

    @action GetTransactionInfo(){
        return HTTPClient.Get(`validator/transactions`)
            .then((res)=>{
                this.Transaction = res.data;
            })
    }

}

const transactionStore = new TransactionStore();
export default transactionStore;