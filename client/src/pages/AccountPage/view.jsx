
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ReactJson from 'react-json-view'


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    Title:{
        marginBottom:20
    },
    SubTitle:{
        marginBottom:15,
    },
    GridContainer: {
        padding: 10
    },
    card: {
        display: 'flex',
        width: 400,
        height: 140,
    },
    ABIcard:{
        overflowY:'visible',
        maxHeight:500,
        maxWidth:800,
    }
})

const AccountPage = props => {

    const {classes} = props;

    return(
        <div className={classes.root}>

            <Grid container spacing={24} className={classes.GridContainer}>
            <Grid item xs={4}> 
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom className={classes.SubTitle}>
                        Account Address
                        </Typography>
                        {props.AccountAddress}
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={8}> 
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom className={classes.SubTitle}>
                        Contract Address
                        </Typography>
                        {props.ContractAddress}
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}> 
                <Card className={classes.ABIcard}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom className={classes.SubTitle}>
                        Contract Application Binary Interface
                        </Typography>
                        <ReactJson theme="monokai" collapsed={false} src={props.ContractABI} />
                    </CardContent>
                </Card>
            </Grid>

            </Grid>
        </div>
    );

}



export default withStyles(styles)(AccountPage);