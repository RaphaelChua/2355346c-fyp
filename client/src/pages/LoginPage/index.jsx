import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter }  from 'react-router-dom';

import View from './view';

class LoginPage extends Component{

    constructor(props){
        super(props);

        this.state={

        }
    }


    onLogin(){

    }

    render() {
        const props = {

        }
        return <View {...props} />;
    }
}

export default withRouter(LoginPage);