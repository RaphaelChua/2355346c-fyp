import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { withRouter } from 'react-router-dom';
import Stores from 'stores';
import View from './view';
import RouteNameChanger from 'services/RouteNameChanger';

var price1;
var price2;

@observer
class SmartContract extends Component{

    constructor(props){
        super(props);
        this.state={
            qty1:0,
            qty2:0,
            SupplierName:"",
            DistributorName:"",
            ConsumerName:"",
            ThirdPartyLogisticsName:"",
            open: false,
            success_open:false,
            contract_address:"",
            transaction_receipt:"",
            disable_button:true,
            tx_1:"",
            tx_2:"",
            deploymsg:"deploying",
            receiptname1:"",
            receiptprice1:undefined,
            receiptname2:"",
            receiptprice2:undefined,
            totalprice:0,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.submitTx = this.submitTx.bind(this);
        this.success_handleClose = this.success_handleClose.bind(this);
    }

    componentDidMount(){
        RouteNameChanger.UpdateRoute("Smart Contract");
        Stores.AccountStore.GetAccountAddress().then(()=>{
            var AccountAddr = Stores.AccountStore.accountAddr;
            this.setState({DistributorName:AccountAddr});
        })
    }
    handleChange=(event)=>{

        var chickenprice = undefined; 
        var fishprice = undefined; 
        var totals = price1 + price2;


        if(event.target.name == "qty1" && event.target.value!=0)
        {
            chickenprice = 10 * event.target.value;
            price1 = chickenprice
            this.setState({
                receiptname1:"Roasted Chicken",
                receiptprice1:"$"+chickenprice,
            })
        }
        else if(event.target.name=="qty1" && event.target.value == 0){
            chickenprice = 0;
            price1 = 0;
            this.setState({
                receiptname1:null,
                receiptprice1:undefined,
            })
        }
        else if(event.target.name=="qty2" && event.target.value!=0){
            fishprice = 12 * event.target.value;
            price2 = fishprice;
            this.setState({
                receiptname2:"Salmon",
                receiptprice2:"$"+fishprice,
            })
        }
        else if(event.target.name=="qty2" && event.target.value == 0){
            fishprice= 0;
            price2 = 0;
            this.setState({
                receiptname2:null,
                receiptprice2:undefined,
            })
        }
        this.setState({
            [event.target.name]:event.target.value, 
            totalprice:(price1  || 0 )+(price2 || 0 ),   
        });
       
        this.forceUpdate() 
    }





    handleClose = () => {
        this.setState({open:false});
    }
    success_handleClose = () => {
        this.setState({success_open:false});
    }
    handleClickOpen = () =>{
        this.setState({open:true});
    }
    async submitTx(){
        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms))
          }
        this.setState({open:false
        ,success_open:true});
 
        const addresses ={
            SupplierName: this.state.SupplierName,
            DistributorName: this.state.DistributorName,
            ConsumerName: this.state.ConsumerName,
            ThirdPartyLogisticsName:this.state.ThirdPartyLogisticsName,
        }
        const orders1 = {
            OrderName:"Roasted Chicken",
            OrderQty: this.state.qty1,
        }
        const orders2 ={
            OrderName:"Salmon",
            OrderQty: this.state.qty2,
        }
        const newAddresses={
            DistributorName:this.state.DistributorName,
            ConsumerName:this.state.ConsumerName,
        }
        const payment={
            ConsumerName:this.state.ConsumerName,
            Price:this.state.totalprice,
        }
        try{
        //Step 1 create the contract
        const ContractResult = await Stores.SmartContractStore.CreateNewContract(addresses);
        console.log("Contract created - " + ContractResult);
        this.setState({contract_address:ContractResult,deploymsg:"deployed",disable_button:false});
        await sleep(3000);

        //Step 2 Send First Orders over
        const TransactionResult1 = await Stores.SmartContractStore.SendTransaction(orders1);
        this.setState({tx_1:"Chicken - "+TransactionResult1})
        await sleep(2000);

        //Step 3 Send Second Orders over
        const TransactionResult2 = await Stores.SmartContractStore.SendTransaction(orders2);
        this.setState({tx_2:"Fish - "+TransactionResult2})
        await sleep(2000);

        //Step 4 Pay the contract the price
        const TransactionResult3 = await Stores.SmartContractStore.SendPayment(payment);
        this.setState({successPayments:TransactionResult3})
        await sleep(2000);

        //Step 5 Transfer the ownership of the contract to consumer
        await Stores.SmartContractStore.TransferOwnership(newAddresses)
        await sleep(2000);

        }
        catch(error){
            console.log(error)
        }
       
    }

    render(){
        const props={
            qty1:this.state.qty1,
            qty2:this.state.qty2,
            handleChange:this.handleChange,
            submitTx:this.submitTx,
            SupplierName:this.state.SupplierName,
            DistributorName:this.state.DistributorName,
            ThirdPartyLogisticsName:this.state.ThirdPartyLogisticsName,
            ConsumerName:this.state.ConsumerName,
            open: this.state.open,
            handleClose: this.handleClose,
            handleClickOpen:this.handleClickOpen,
            success_open:this.state.success_open,
            success_handleClose:this.success_handleClose,
            contract_address:this.state.contract_address,
            transaction_receipt:this.state.transaction_receipt,
            disable_button:this.state.disable_button,
            tx_1:this.state.tx_1,
            tx_2:this.state.tx_2,
            deploymsg:this.state.deploymsg,
            receiptname1:this.state.receiptname1,
            receiptprice1:this.state.receiptprice1,
            receiptname2:this.state.receiptname2,
            receiptprice2:this.state.receiptprice2,
            totalprice:this.state.totalprice,
        }
        return <View {...props} />;
    }
}

export default withRouter(SmartContract);