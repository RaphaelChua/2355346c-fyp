import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter }  from 'react-router-dom';
import  RouteNameChanger from 'services/RouteNameChanger';
import View from './view';
import Stores from '../../stores';

@observer
class TransactionPage extends Component{

    constructor(props){
        super(props);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.TransactionDetails = this.TransactionDetails.bind(this);
        this.state={
            page: 0,
            rowsPerPage: 10,
        }

    }
    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
      };
    TransactionDetails(e){
        // console.log(JSON.stringify(e))
        this.props.history.push({
        pathname:`transaction/details/${e.header_signature}`,
        state:JSON.stringify(e)
        })
        
        // console.log(e.header.batcher_public_key)
      }
      
    componentDidMount(){
        RouteNameChanger.UpdateRoute("Transaction");
        Stores.TransactionStore.GetTransactionInfo()
    }

    render(){
    const props={
        Transaction:Stores.TransactionStore.Transaction,
        page: this.state.page,
        rowsPerPage: this.state.rowsPerPage,
        handleChangeRowsPerPage: this.handleChangeRowsPerPage,
        handleChangePage: this.handleChangePage,
        TransactionDetails: this.TransactionDetails,
    }
    
    return <View {...props} />;
    }
}


export default withRouter(TransactionPage);