import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { withStyles } from "@material-ui/core/styles";


const drawerWidth = 240;

const styles = theme => ({
    root:{
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
      menuButtonHidden: {
        display: 'none',
      },
      appBar:{
        //   background:'#8fc4c1'
        background:'#0f3e50',
        paddingLeft:20,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
      },
});

const TopBar = props =>{
    
    const { classes } = props;
    return(
    <div>
     <AppBar position="absolute" className={classNames(classes.appBar ,props.open && classes.appBarShift)}>
     <Toolbar disableGutters={!props.open} className={classes.toolbar} >
          <IconButton 
          className={classNames(
              classes.menuButton,
              props.open && classes.menuButtonHidden,
          )} 
          color="inherit" 
          aria-label="Open drawer"
          onClick={props.handleDrawerOpen}
          
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
           {props.MenuNames}
          </Typography>
          <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
        </Toolbar>
        
     </AppBar>
     </div>
    );
}


export default withStyles(styles)(TopBar);