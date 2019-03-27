import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter }  from 'react-router-dom';
import  RouteNameChanger from 'services/RouteNameChanger';
import View from './view';
import Stores from '../../stores';


@observer
class TransactionDetailPage extends Component{

    constructor(props){
        super(props);
        this.state={
            TransactionID:'',
            TransactionFamily:'',
            TransactionVersion:'',
            SignerPublicKey:'',
            BatcherPublicKey:'',
            Nonce:'',
            TransactionInput:[],
            TransactionOutput:[],
            TransactionPayload:''
        }
        
        this.loadTransaction = this.loadTransaction.bind(this);

    }

    componentDidMount(){
        this.transactionId = this.props.location.pathname;
        this.detail = JSON.parse(this.props.location.state);
        // console.log(this.detail);
        console.log(this.detail.header)
        this.loadTransaction();
        RouteNameChanger.UpdateRoute("Transaction Details");
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.transactionId) {
          this.transactionId = nextProps.match.params.id;
          this.loadTransaction();
        }
      }

    loadTransaction(){
        // console.log(this.detail.header)
        this.setState({
            TransactionID: this.detail.header_signature,
            TransactionFamily:this.detail.header.family_name,
            TransactionVersion:this.detail.header.family_version,
            SignerPublicKey:this.detail.header.signer_public_key,
            BatcherPublicKey:this.detail.header.batcher_public_key,
            Nonce:this.detail.header.nonce,
            TransactionInput:this.detail.header.inputs,
            TransactionOutput:this.detail.header.outputs,
            TransactionPayload:this.detail.payload,
        })
      }

    render(){
        const props ={
            TransactionID:this.state.TransactionID,
            TransactionFamily:this.state.TransactionFamily,
            TransactionVersion:this.state.TransactionVersion,
            SignerPublicKey:this.state.SignerPublicKey,
            BatcherPublicKey:this.state.BatcherPublicKey,
            Nonce:this.state.Nonce,
            TransactionInput:this.state.TransactionInput,
            TransactionOutput:this.state.TransactionOutput,
            TransactionPayload:this.state.TransactionPayload,
        }
        return(<View {...props} />);
    }
}




export default withRouter(TransactionDetailPage);