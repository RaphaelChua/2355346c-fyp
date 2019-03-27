import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Stores from 'stores';
import View from './view';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import  RouteNameChanger from 'services/RouteNameChanger';
@observer
class Block extends Component{
    constructor(props){
        super(props); 
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.BlockDetails = this.BlockDetails.bind(this);
        this.state={
            page: 0,
            rowsPerPage: 10,
        };
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
      };
    componentDidMount(){
        RouteNameChanger.UpdateRoute("Block");
        Stores.BlockStore.GetBlockInfo().then(console.log)
    }
    BlockDetails(e){
        this.props.history.push({
            pathname:`block/details/${e.header_signature}`,
            state:JSON.stringify(e)
            })
    }

    render(){
        const props={
            Blocks: Stores.BlockStore.Blocks,
            page: this.state.page,
            rowsPerPage: this.state.rowsPerPage,
            handleChangeRowsPerPage: this.handleChangeRowsPerPage,
            handleChangePage: this.handleChangePage,
            BlockDetails:this.BlockDetails,
        }
        return (
        <View {...props} />
        );
    }
}

export default withRouter(Block)