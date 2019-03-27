import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import View from './view';
import Stores from 'stores';
import  RouteNameChanger from 'services/RouteNameChanger';
import { request } from 'https';


@observer
class ContractInformation extends Component{
    constructor(props){
        super(props);
        this.state={
            //First Table
            page: 0,
            rowsPerPage: 5,
            
            //Second Table
            page2:0,
            rowsPerPage2:5,

            //Third Table
            page3:0,
            rowsPerPage3:5,

            //Fourth Table
            page4:0,
            rowsPerPage4:5,


        }
        //First Table
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.DownloadVideo = this.DownloadVideo.bind(this);

        //Second Table
        this.handleChangePage2 = this.handleChangePage2.bind(this);
        this.handleChangeRowsPerPage2 = this.handleChangeRowsPerPage2.bind(this);

        //Third Table
        this.handleChangePage3 = this.handleChangePage3.bind(this);
        this.handleChangeRowsPerPage3 = this.handleChangeRowsPerPage3.bind(this);

        //Fourth Table
        this.handleChangePage4 = this.handleChangePage4.bind(this);
        this.handleChangeRowsPerPage4 = this.handleChangeRowsPerPage4.bind(this);
    }

    //First Table
    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
      };
    DownloadVideo = (videoID) => {
      Stores.QueryStore.DownloadVideo(videoID);
      // Stores.QueryStore.DownloadVideo("TVRCdGFXNXpNVEl4TWpFNA==");
    }


    //Second Table
    handleChangePage2 = (event, page2) => {
        this.setState({ page2 });
      };
    handleChangeRowsPerPage2 = event => {
        this.setState({ rowsPerPage2: event.target.value });
      };
    
    //Third Table
    handleChangePage3 = (event, page3) => {
        this.setState({ page3 });
      };
    handleChangeRowsPerPage3 = event => {
        this.setState({ rowsPerPage3: event.target.value });
      };

    //Fourth Table
    handleChangePage4 = (event, page4) => {
        this.setState({ page4 });
      };
    handleChangeRowsPerPage4 = event => {
        this.setState({ rowsPerPage4: event.target.value });
      };
  


    componentDidMount(){
        RouteNameChanger.UpdateRoute("Contract Information");

        Stores.QueryStore.GetStatus();
        Stores.QueryStore.GetStatusInfo();
        Stores.QueryStore.GetEnvStatus();
        Stores.QueryStore.GetMoveStatus();

    }
    render(){
        const props={
            //First Table
            StatusOnDeliveryProduct: Stores.QueryStore.Status,
            page: this.state.page,
            rowsPerPage: this.state.rowsPerPage,
            handleChangePage: this.handleChangePage,
            handleChangeRowsPerPage: this.handleChangeRowsPerPage,
            DownloadVideo:this.DownloadVideo,
           
            //Second Table
            StatusInfoOnDeliveryProduct: Stores.QueryStore.StatusInfo,
            page2: this.state.page2,
            rowsPerPage2: this.state.rowsPerPage2,
            handleChangePage2: this.handleChangePage2,
            handleChangeRowsPerPage2: this.handleChangeRowsPerPage2,

            //Third Table
            StatusOnEnvironment: Stores.QueryStore.EnvInfo,
            page3: this.state.page3,
            rowsPerPage3: this.state.rowsPerPage3,
            handleChangePage3: this.handleChangePage3,
            handleChangeRowsPerPage3: this.handleChangeRowsPerPage3,

            //Fourth Table
            StatusOnMovement: Stores.QueryStore.MoveInfo,
            page4: this.state.page4,
            rowsPerPage4: this.state.rowsPerPage4,
            handleChangePage4: this.handleChangePage4,
            handleChangeRowsPerPage4: this.handleChangeRowsPerPage4,
        }
        return <View {...props} />;
    }
}

export default withRouter(ContractInformation);
