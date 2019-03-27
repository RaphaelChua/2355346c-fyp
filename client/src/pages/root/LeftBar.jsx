import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
// import SimpleLineChart from './SimpleLineChart';
import  MainListItems from './LeftBarListItem';

const drawerWidth = 240;


const styles = theme => ({
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
        width:10
    },
    appBarSpacer: theme.mixins.toolbar,
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        height:'100vh',
        overflow:'hidden',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },

})

const LeftBar = props => {
    const { classes } = props
    return (
        <div>
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(props.open && classes.drawerPaper, !props.open && classes.drawerPaperClose),
                }}
                open={props.open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={props.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <MainListItems {...props} />
                </List>

            </Drawer>
        </div>
    );
}

export default withStyles(styles)(LeftBar);