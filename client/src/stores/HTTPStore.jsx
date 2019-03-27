import { observable , action } from 'mobx';

class HTTPStore {
    @observable Error = '';

    @action ClearError() {
        this.Error ='';
    }

    @action SetError(error){
        this.Error = error.message;
    }
}

const httpStore = new HTTPStore();
export default httpStore;