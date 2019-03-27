import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from './TopBar';
import LeftBar from './LeftBar';
import Routes from './Routes';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    PagesContent: {
        marginLeft: 20,
        paddingLeft: 80,
        // flexGrow: 1,
        marginTop: 90,
    }
}


const View = props => (
    <BrowserRouter>
        <div style={{ display: 'flex' }} >

            <CssBaseline />
            <TopBar {...props} />
            <LeftBar {...props} />
            <div style={styles.PagesContent}>
                <Routes />

            </div>

        </div>
    </BrowserRouter>
);



export default View;