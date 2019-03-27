import { observable , action } from 'mobx';

class RouteNameChanger { 

    @observable title = "";
    
    @action
    UpdateRoute(e){
        this.title = e;
    }



}

const routeNameChanger = new RouteNameChanger();
export default routeNameChanger;