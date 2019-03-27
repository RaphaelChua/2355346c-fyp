import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter }  from 'react-router-dom';
import  RouteNameChanger from 'services/RouteNameChanger';
import View from './view';
import Stores from '../../stores';

@observer
class BlockDetailPage extends Component{
    constructor(props){
        super(props);
        this.state={
            BlockID:'',
            BlockNum:0,
            PreviousBlockID:'',
            Consensus:'',
            SignerPublicKey:'',
            StateRootHash:'',
        }
        this.loadBlock = this.loadBlock.bind(this);
    }


    componentDidMount(){
        this.blockId = this.props.location.pathname;
        this.detail = JSON.parse(this.props.location.state);
        console.log(this.detail.header)
        this.loadBlock();
        RouteNameChanger.UpdateRoute("Block Details");
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.blockId) {
          this.blockId = nextProps.match.params.id;
          this.loadBlock();
        }
      }
    loadBlock(){
        this.setState({
            BlockID:this.detail.header_signature,
            BlockNum:this.detail.header.block_num,
            PreviousBlockID:this.detail.header.previous_block_id,
            Consensus: this.detail.header.consensus,
            SignerPublicKey: this.detail.header.signer_public_key,
            StateRootHash: this.detail.header.state_root_hash,
        })
    }

    render(){
        const props={
            BlockID:this.state.BlockID,
            BlockNum:this.state.BlockNum,
            PreviousBlockID:this.state.PreviousBlockID,
            Consensus:this.state.Consensus,
            SignerPublicKey:this.state.SignerPublicKey,
            StateRootHash:this.state.StateRootHash,
        }
    return(<View {...props} />);
    }
}



export default withRouter(BlockDetailPage);