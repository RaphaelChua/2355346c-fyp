import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter }  from 'react-router-dom';  
import Stores from 'stores';
import View from './view';
import  RouteNameChanger from 'services/RouteNameChanger';
import { 
    subscribeTransactionFeed,
    subscribeBlockFeed,
    subscribeBatchFeed,
    cancelSubscription } from 'services/SocketClient';

import openSocks from "socket.io-client";


@observer
class DashBoard extends Component{

    constructor(props){
        super(props);
        this.state={
            peersNumber:0,
            blockNumber:0,
            txNumber:0,
            batchNumber:0,

        }
        this.routeChange = this.routeChange.bind(this);

       
    }

     componentWillUnmount () {
        // unsubscribe when changing page
        cancelSubscription("FromTransaction")
        cancelSubscription("FromBlock")
        cancelSubscription("FromBatch")
     }
    routeChange(e){
        this.props.history.push(e);
    }
    componentDidMount(){

        subscribeBlockFeed((err,data)=>{
            this.setState({
                blockNumber:data
            })
        })
        subscribeTransactionFeed((err,data)=>{
            this.setState({
                txNumber:data
            })
        })
            subscribeBatchFeed((err,data)=>{
                this.setState({
                    batchNumber:data
                })
            })

        RouteNameChanger.UpdateRoute("Dashboard");
        Stores.DashboardStore.GetPeersNumber().then(()=>{
            var peers = Stores.DashboardStore.state.PeersNum;
            this.setState({peersNumber:peers});
        })
        Stores.DashboardStore.GetBlocks().then(()=>{
            var blocknum = Stores.DashboardStore.state.BlockNum;
            console.log(blocknum);
            this.setState({blockNumber:blocknum});
        })
        Stores.DashboardStore.GetTransactions().then(()=>{
            var txNum = Stores.DashboardStore.state.TransactionsNum;
            this.setState({txNumber:txNum});
        })
        Stores.DashboardStore.GetBatches().then(()=>{
            this.setState({batchNumber:Stores.DashboardStore.state.BatchesNum})
        })

    };

    render(){
        const props={
            peersNumber:this.state.peersNumber,
            blockNumber:this.state.blockNumber,
            txNumber:this.state.txNumber,
            routeChange:this.routeChange,
            batchNumber:this.state.batchNumber,
            // timestamp:this.state.timestamp,
        }
        return <View {...props} />;
    }

}

export default withRouter(DashBoard);