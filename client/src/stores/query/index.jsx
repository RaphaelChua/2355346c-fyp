import {observable,action} from 'mobx';
import HTTPClient from 'services/HTTPClient';
import FileDownload from 'js-file-download';
import { save } from 'save-file';

class QueryStore{

    @observable Status =[];
    @observable StatusInfo =[];
    @observable EnvInfo = [];
    @observable MoveInfo = [];
    @observable state ={
        DeliveryStatus:'',
        ConsumerDeposit:0,
        DistributorPayment:0,
        ThirdPartyLogisticsPayment:0,
        Message:'',
    }

    @observable Status = [];
    @observable StatusInfo =[];

    @action GetDeliveryStatus(){
        return HTTPClient.Get(`contract/getCurrentDeliveryState`)
            .then((res)=>{
                this.state.DeliveryStatus = res.data;
            })
    }
    @action GetConsumerDeposit(){
        return HTTPClient.Get(`contract/getConsumerDeposits`)
            .then((res)=>{
                this.state.ConsumerDeposit = Number(res.data);
            })
    }
    @action GetDistributorPayment(){
        return HTTPClient.Get(`contract/getDistributorPayments`)
        .then((res)=>{
            this.state.DistributorPayment = Number(res.data);
        })
    }
    @action GetThirdPartyLogisticsPayment(){
        return HTTPClient.Get(`contract/getDeliveryPayments`)
        .then((res)=>{
            this.state.ThirdPartyLogisticsPayment = Number(res.data);
        })
    }
    @action GetStatus(){
        return HTTPClient.Get(`contract/queryStatus`)
        .then((res)=>{
            this.Status = res.data;
        })
    }
    @action GetStatusInfo(){
        return HTTPClient.Get(`contract/queryStatusInformation`)
        .then((res)=>{
           this.StatusInfo = res.data;
        })
    }
    @action GetEnvStatus(){
        return HTTPClient.Get(`contract/queryEnvironmentStatus`)
        .then((res)=>{
            this.EnvInfo = res.data;
        })
    }
    @action GetMoveStatus(){
        return HTTPClient.Get(`contract/queryMovementStatus`)
        .then((res)=>{
            this.MoveInfo = res.data;
        })
    }
    @action ConfirmDelivery(address){
        return HTTPClient.Post(`transaction/confirmDelivery`,address)
        .then((res)=>{
            console.log("axios" + res);
           this.state.Message = res.data;
        })
    }
    
    @action GetContractConsumerAddress(){
        return HTTPClient.Get(`contract/getContractConsumerAddress`)
        .then((res)=>{
            return res.data;
        })
    }

    @action DownloadVideo(videoID){
        return HTTPClient.Get(`contract/downloadVideo?id=${videoID}`)
        .then((res)=>{
            const video = res.data;
            var blob = new Blob([video], { type: 'video/mp4' });        
            save(blob,"10min.txt");
        })
    }


}


const queryStore = new QueryStore();
export default queryStore;