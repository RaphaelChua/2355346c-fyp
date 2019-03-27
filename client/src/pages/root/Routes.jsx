import React from 'react';

import { Route, Switch,BrowserRouter } from 'react-router-dom';
import DashBoardPage from 'pages/DashBoardPage';
import TransactionPage from 'pages/TransactionPage';
import AccountPage from 'pages/AccountPage';
import BlockPage from 'pages/BlockPage';
import SmartContractPage from 'pages/SmartContractPage';
import DeliveryPage from 'pages/DeliveryPage';
import TransactionDetailPage from 'pages/TransactionDetailPage';
import BlockDetailPage from 'pages/BlockDetailPage';
import BatchPage from 'pages/BatchPage';
import BatchDetailPage from 'pages/BatchDetailPage';
import ContractInformationPage from 'pages/ContractInformationPage';

const Routes = () => (
    <div>
    <Switch>
        <Route exact path="/dashboard" component={DashBoardPage} />
        <Route exact path="/block" component={BlockPage} />
        <Route exact path="/transaction" component={TransactionPage} />
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/smartcontract" component={SmartContractPage} />
        <Route exact path="/delivery" component={DeliveryPage} />
        <Route exact path="/contractinformation" component={ContractInformationPage} />
        <Route exact path="/transaction/details/:id" component={TransactionDetailPage} />
        <Route exact path="/block/details/:id" component={BlockDetailPage} />
        <Route exact path="/batch" component={BatchPage} />
        <Route exact path="/batch/details/:id" component={BatchDetailPage} />
    </Switch>
    </div>
);

export default Routes;