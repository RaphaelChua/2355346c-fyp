import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter }  from 'react-router-dom';
import  RouteNameChanger from 'services/RouteNameChanger';
import View from './view';
import Stores from '../../stores';

@observer
class BatchDetailPage extends Component{
    constructor(props){
        super(props);
        this.state={     
            BatchID:''
         }
        this.loadBlock = this.loadBlock.bind(this);
    }
    componentDidMount(){
        this.batchId = this.props.location.pathname;
        this.detail = JSON.parse(this.props.location.state);
        console.log(this.detail.header)
        this.loadBlock();
        RouteNameChanger.UpdateRoute("Batch Details");
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.batchId) {
          this.batchId = nextProps.match.params.id;
          this.loadBlock();
        }
      }
    loadBlock(){
        this.setState({
            BatchID:this.detail.header_signature,
        })
    }
    render(){
        const props={
            BatchID:this.state.BatchID,
        }
    return(<View {...props} />);
    }

}


export default withRouter(BatchDetailPage);