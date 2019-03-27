import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const styles = theme =>({
    GridContainer: {
        padding: 10
    },
    root:{
        flexGrow: 1
    }, 
    GridItem:{
        display:'table-row'
    },
    Text2:{
        display:'table-cell',
        paddingLeft:10,
    },
    Text3:{
        display:'table-cell',
        paddingLeft:10,
        whiteSpace:'normal',
        wordBreak:'break-all',
        maxWidth:1000,
    },
})

const BatchDetail = props =>{
    const { classes , theme } = props;

    return ( 
    <div className={classes.root}> 
        <Grid container spacing={24} className={classes.GridContainer}>
            <Grid item xl={10} className={classes.GridItem}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" color="inherit" noWrap className={classes.Text2}>Batch ID: </Typography>
                        <Typography variant="h6" color="inherit" noWrap className={classes.Text3}> {props.BatchID}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </div>)

}

    
export default withStyles(styles)(BatchDetail);