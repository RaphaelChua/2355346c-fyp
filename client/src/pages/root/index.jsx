import React, {Component} from 'react';
import { observer } from 'mobx-react';
import View from './view';
import RouteNameChanger from 'services/RouteNameChanger';


@observer
class Root extends Component{
    constructor(props){
        super(props);
        console.log("Blockchain Application Loaded!");
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.testbutton = this.testbutton.bind(this);
        this.state ={
            open:false,
            MenuNames:"",
        };
    }

    testbutton =() =>{
        console.log("testing")
    }
    changeTitle =(e)=>{
        this.setState({
            MenuNames:e,
        })
    }

    handleDrawerOpen = () =>{
        this.setState({open:true});
    }
    handleDrawerClose = () =>{
        this.setState({open:false});
    }

    render(){
        const props = {
        handleDrawerOpen: this.handleDrawerOpen,
        handleDrawerClose: this.handleDrawerClose,
        changeTitle:this.changeTitle,
        testbutton: this.testbutton,
        open: this.state.open,
        MenuNames: RouteNameChanger.title,
        }
        return (<View {...props} />);
    }

}

export default Root;