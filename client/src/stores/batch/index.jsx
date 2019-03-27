import {observable,action} from 'mobx';
import HTTPClient from 'services/HTTPClient';

class BatchStore{

    @observable Batches = [];

    @action GetBatchInfo(){
        return HTTPClient.Get(`validator/batches`)
            .then((res)=>{
                this.Batches = res.data;
            })
    }


}

const batchStore = new BatchStore();
export default batchStore;