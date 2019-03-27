import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter }  from 'react-router-dom';
import  RouteNameChanger from 'services/RouteNameChanger';
import View from './view';
import Stores from '../../stores';


@observer
class Batch extends Component{

    constructor(props){
        super(props);
        this.state={
            page: 0,
            rowsPerPage: 10,
        }
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.BatchDetails = this.BatchDetails.bind(this);
  
    }
    componentDidMount(){
        RouteNameChanger.UpdateRoute("Batch");
        Stores.BatchStore.GetBatchInfo();
        

        console.log("hey ----- "+Stores.BatchStore.Batches)
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
      };
    BatchDetails(e){
        this.props.history.push({
            pathname:`batch/details/${e.header_signature}`,
            state:JSON.stringify(e)
            })
    }

    render(){
        const props={
            Batches: Stores.BatchStore.Batches,
            BatchDetails:this.BatchDetails,
            page: this.state.page,
            rowsPerPage: this.state.rowsPerPage,
            handleChangeRowsPerPage: this.handleChangeRowsPerPage,
            handleChangePage: this.handleChangePage,
        }
        return (<View {...props} />);
    }
    

}
export default withRouter(Batch);