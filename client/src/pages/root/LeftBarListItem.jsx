import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountIcon from '@material-ui/icons/AccountCircle';
import SmartContract from '@material-ui/icons/Description';
import TransactionIcon from '@material-ui/icons/SwapHoriz';
import DeliveryIcon from '@material-ui/icons/DirectionsCar'
import SearchIcon from '@material-ui/icons/Search';
import ContractInformationIcon from '@material-ui/icons/Assignment';
import Batch from '@material-ui/icons/FileCopy';
import BlockIcon from '@material-ui/icons/CollectionsBookmark'
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';

const MainListItems = props =>{

    return(
  <div>
    <ListItem button component={Link} to="/dashboard" > 
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/block" >
      <ListItemIcon>
        <BlockIcon />
      </ListItemIcon>
      <ListItemText primary="Blocks" />
    </ListItem>
    <ListItem button component={Link} to="/batch"  >
      <ListItemIcon>
        <Batch />
      </ListItemIcon>
      <ListItemText primary="Batches" />
    </ListItem>
    <ListItem button component={Link} to="/transaction"  >
      <ListItemIcon>
        <TransactionIcon />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItem>
    <ListItem button component={Link} to="/contractinformation"  >
      <ListItemIcon>
        <ContractInformationIcon />
      </ListItemIcon>
      <ListItemText primary="Contract Info" />
    </ListItem>
    <Divider />
    <ListItem button component={Link} to="/delivery" >
    <ListItemIcon>
      <DeliveryIcon />
    </ListItemIcon>
      <ListItemText primary="Delivery" />
    </ListItem>
    <ListItem button component={Link} to="/smartcontract" >
    <ListItemIcon>
      <SmartContract />
    </ListItemIcon>
      <ListItemText primary="Smart Contract" />
    </ListItem>
    <ListItem button component={Link} to="/account" >
      <ListItemIcon>
        <AccountIcon />
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItem>
    
  </div>
);
}


export default MainListItems;