import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';

  
const styles = theme => ({
    GridContainer: {
        padding: 10,
        width:1200
    },
    root: {
        flexGrow: 1
    },
    divider:{
        marginTop:10,
        marginBottom:10,
    },
    card:{
        height:133,
    },
    GridItem:{
        maxWidth:400
    }
})

const QueryContract = props => {

    const { classes, theme } = props;

    return(
    <div className={classes.root}>
         <Grid container spacing={24} className={classes.GridContainer}>
            <Grid item xs={8} className={classes.GridItem}>
                <Card className={classes.card}>
                    <CardContent>
                    
                            <Grid>
                                <Typography variant="h6">
                                    Delivery Status
                                </Typography>   
                            </Grid>
                            <Grid>
                                <Typography variant="body1">
                                {props.deliveryStatus}
                                </Typography>   
                            </Grid>
                       
                    </CardContent>
                
                </Card>
            </Grid>

            <Grid item xs={8} className={classes.GridItem}>
                <Card>
                    <CardContent>
                        <Grid>
                            <Typography variant="h6">
                                Payments
                            </Typography>   
                        </Grid>
                        <Grid>
                            <Typography variant="body1">
                              Retailer Deposit - {props.consumerDeposit}
                            </Typography>   
                        </Grid>
                        <Grid>
                            <Typography variant="body1">
                              Distributor Payment - {props.distributorPayment}
                            </Typography>   
                        </Grid>
                        <Grid>
                            <Typography variant="body1">
                              3PL Payment - {props.thirdPartyLogisticsPayment}
                            </Typography>   
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={8} className={classes.GridItem}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            Confirm Delivery
                        </Typography>
                        <Typography variant="body1" style={{paddingTop:20,paddingBottom:20}}>
                            {props.deliveryMessage}
                        </Typography>
                        <Button onClick={()=> props.confirmDelivery()} variant="contained" color="primary" >Confirm</Button>       
                    </CardContent>
                </Card>
            </Grid>

         </Grid>
    </div>
    );
}

export default withStyles(styles)(QueryContract);