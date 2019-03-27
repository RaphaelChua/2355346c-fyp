import {observable,action} from 'mobx';
import HTTPClient from 'services/HTTPClient';

class BlockStore{

    @observable Blocks = [];

    @action GetBlockInfo(){
        return HTTPClient.Get(`validator/blocks`)
            .then((res)=>{
                this.Blocks = res.data;
            })
    }


}

const blockStore = new BlockStore();
export default blockStore;