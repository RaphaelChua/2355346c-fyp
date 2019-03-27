import {observable,action} from 'mobx';
import HTTPClient from 'services/HTTPClient';

class DashboardStore{

    @observable state = {
        // Address:[],
        PeersNum: 0,
        BlockNum:0,
        TransactionsNum:0,
        BatchesNum:0,
    }


    @action GetPeersNumber(){
        return HTTPClient.Get(`validator/peers`)
            .then((res)=>{
                this.state.PeersNum = res.data;
            });

    }
    @action GetBlocks(){
        return HTTPClient.Get(`validator/blocks`)
            .then((res)=>{
                this.state.BlockNum = res.data.length;
        })
    }

    @action GetTransactions(){
        return HTTPClient.Get(`validator/transactions`)
            .then((res)=>{    
                this.state.TransactionsNum = res.data.length;      
            })
    }

    @action GetBatches(){
        return HTTPClient.Get(`validator/batches`)
            .then((res)=>{
                this.state.BatchesNum = res.data.length;
            })
    }

}

const dashBoardStore = new DashboardStore();
export default dashBoardStore;