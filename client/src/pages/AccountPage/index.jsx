import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter }  from 'react-router-dom';
import  RouteNameChanger from 'services/RouteNameChanger';
import View from './view';
import Stores from 'stores';

@observer
class AccountPage extends Component{

    constructor(props){
        super(props);
        this.state={
            AccountAddress:"",
            AccountStateLabel:"Unlocked",
            AccountState: undefined,
            ContractAddress:"",
            ContractABI:{}

        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = () =>{
        console.log("Before " + this.state.AccountState)
        this.setState({ 
            AccountState: !this.state.AccountState });
      
        console.log("After " + this.state.AccountState);
      if(this.state.AccountState == false)
      {
        this.setState({AccountStateLabel:"Unlocked"})
          console.log("hi")
      }
      else
      {
          this.setState({AccountStateLabel:"Locked"})
          console.log("treu")

      }
    }

    componentDidMount(){
        RouteNameChanger.UpdateRoute("Account");

        Stores.AccountStore.GetAccountAddress().then(()=>{
            var AccountAddr = Stores.AccountStore.accountAddr;
            this.setState({AccountAddress:AccountAddr});
        })

        Stores.AccountStore.GetContractAddress().then(()=>{
            this.setState({ContractAddress:Stores.AccountStore.contractAddr})
        })
        Stores.AccountStore.GetContractABI().then(()=>{
            this.setState({ContractABI:Stores.AccountStore.contractABI})
        })
    }
    render(){
        const props={
            AccountAddress:this.state.AccountAddress,
            AccountStateLabel:this.state.AccountStateLabel,
            handleChange: this.handleChange,
            AccountState:this.state.AccountState,
            ContractAddress:this.state.ContractAddress,
            ContractABI:this.state.ContractABI,
        }
        return <View {...props} />;
    }

}

export default withRouter(AccountPage);