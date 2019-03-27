import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { withRouter } from 'react-router-dom';
import Stores from 'stores';
import View from './view';
import RouteNameChanger from 'services/RouteNameChanger';
import Config from 'Config';
import _ from 'lodash';

@observer
class QueryContract extends Component{

    constructor(props){
        super(props);
        this.state={
            deliveryMessage:'',
        }
        this.confirmDelivery = this.confirmDelivery.bind(this);
    }
    confirmDelivery = () => {
        Stores.QueryStore.GetContractConsumerAddress().then((res)=>{
            const result ={
                ConsumerAddress :res
            }
           return Stores.QueryStore.ConfirmDelivery(result);
        }).then((res2)=>{
            console.log(res2)
            this.setState({deliveryMessage:Stores.QueryStore.state.Message})
        })
    };
        
    componentDidMount(){
        RouteNameChanger.UpdateRoute("Delivery");
        this.setState({apiKey:Config.apiKey})
        Stores.QueryStore.GetDeliveryStatus()
        Stores.QueryStore.GetConsumerDeposit();
        Stores.QueryStore.GetDistributorPayment();
        Stores.QueryStore.GetThirdPartyLogisticsPayment();

        // var joinedArray;
        // Stores.QueryStore.GetStatus().then(()=>{
        //     return Stores.QueryStore.GetStatusInfo()
        // }).then(()=>{
        //     joinedArray = _.merge(Stores.QueryStore.Status,Stores.QueryStore.StatusInfo)
        //     this.setState({deliveryData:joinedArray})
        //     console.log(JSON.stringify(joinedArray,null,2));
        // })
    }
    

    render(){
        const props={
            apiKey:this.state.apiKey,
            center: this.state.center,
            zoom:this.state.zoom,
            deliveryStatus:Stores.QueryStore.state.DeliveryStatus,
            consumerDeposit:"$"+Stores.QueryStore.state.ConsumerDeposit,
            distributorPayment:"$"+Stores.QueryStore.state.DistributorPayment,
            thirdPartyLogisticsPayment:"$"+Stores.QueryStore.state.ThirdPartyLogisticsPayment,
            deliveryMessage:this.state.deliveryMessage,
            confirmDelivery:this.confirmDelivery,
        }
        return <View {...props} />;
    }
}



export default withRouter(QueryContract);