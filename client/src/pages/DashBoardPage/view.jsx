
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import Typography from '@material-ui/core/Typography';

import BlockIcon from '@material-ui/icons/CollectionsBookmark'
import TXIcon from '@material-ui/icons/SwapHoriz';
import Batch from '@material-ui/icons/FileCopy';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    GridContainer: {
        padding: 10
    },
    root: {
        flexGrow: 1
    },
    card: {
        display: 'flex',
        width: 400,
        height: 140,
        '&:hover': {
            boxShadow: "-1px 3px 10px 0px" 
          }
    },
    largeIcon: {
        width: 100,
        height: 100,
        color: "navy"
    },
    rightContent: {
        textAlign: 'right',
        flex: 1,
        margin: 5,
    },
    rightDigit: {
        marginTop: 10,
        marginRight: 2
    },
    GridItem:{
        marginBottom:20,
    }
})

const DashBoard = props => {

    const { classes, theme } = props;

    return (
        <div className={classes.root}>
       {/* {props.timestamp} */}
            <Grid container spacing={24} className={classes.GridContainer}>
                <Grid item xs={4} className={classes.GridItem}>
                    <Card className={classes.card} >
                        <CardContent>
                            <PeopleIcon className={classes.largeIcon} />
                        </CardContent>
                        <CardContent className={classes.rightContent}>
                            <Typography variant="h5" color="inherit" noWrap> PEER </Typography>
                            <Typography variant="h3" color="inherit" noWrap className={classes.rightDigit}> {props.peersNumber} </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            
                <Grid item xs={8} className={classes.GridItem}>    
                    <Card className={classes.card} onClick={()=>props.routeChange("/block")} >
                        <CardContent>
                            <BlockIcon className={classes.largeIcon} />
                        </CardContent>
                        <CardContent className={classes.rightContent}>
                            <Typography variant="h5" color="inherit" noWrap> BLOCK </Typography>
                            <Typography variant="h3" color="inherit" noWrap className={classes.rightDigit}> {props.blockNumber} </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card} onClick={()=>props.routeChange("/transaction")}>
                        <CardContent>
                            <TXIcon className={classes.largeIcon} />
                        </CardContent>
                        <CardContent className={classes.rightContent}>
                            <Typography variant="h5" color="inherit" noWrap> TX </Typography>
                            <Typography variant="h3" color="inherit" noWrap className={classes.rightDigit}> {props.txNumber} </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card className={classes.card} onClick={()=>props.routeChange("/batch")}>
                        <CardContent>
                            <Batch className={classes.largeIcon} />
                        </CardContent>
                        <CardContent className={classes.rightContent}>
                            <Typography variant="h5" color="inherit" noWrap> Batch </Typography>
                            <Typography variant="h3" color="inherit" noWrap className={classes.rightDigit}> {props.batchNumber} </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>





        </div>
    );

}



export default withStyles(styles)(DashBoard);