import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider } from '@material-ui/core';

const styles = theme =>({
    GridContainer: {
        padding: 10
    },
    root:{
        flexGrow: 1
    },
    Text:{
        display:'inline-block',
        paddingLeft:10
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
    cardoverflow:{
        whiteSpace:'normal',
        wordBreak:'break-all'
    },
    Payload:{
        whiteSpace:'normal',
        wordBreak:'break-all',
    },
    GridItem:{
        display:'table-row'
    },
    card:{
        maxWidth: 1200,
        width:'auto',
        height:'auto',
        padding:10
    },
    SecondText:{
        display:'inline-block',
        paddingLeft:20
    },
    CardContentText:{

        marginLeft:10
    },
    leftCard:{
        display:'inline-block',
        width:'auto'
    },
    
})


const TransactionDetail = props =>{
    const { classes , theme } = props;

    return (
        <div className={classes.root}>
        <Grid container spacing={24} className={classes.GridContainer}>
        <Grid item xl={10} className={classes.GridItem}>
            <Card>
                <CardContent>
                    <Typography variant="h6" color="inherit" noWrap className={classes.Text2}>Transaction ID: </Typography>
                    <Typography variant="h6" color="inherit" noWrap className={classes.Text3}> {props.TransactionID}</Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} >
        <Card className={classes.card}>
            <CardContent>
            <div className={classes.CardContentText}>
            <Typography className={classes.Text} style={{marginRight:113}} variant="h6" color="inherit" noWrap>Family:</Typography>
            <Typography className={classes.SecondText} variant="h6" color="inherit" noWrap>{props.TransactionFamily}, {props.TransactionVersion}</Typography>
            </div>
            <div className={classes.CardContentText}>
            <Typography className={classes.Text} style={{marginRight:12}}  variant="h6" color="inherit" noWrap>Signer Public Key:</Typography>
            <Typography className={classes.SecondText} variant="h6" color="inherit" noWrap>{props.SignerPublicKey}</Typography>
            </div>
            <div className={classes.CardContentText}>
            <Typography className={classes.Text} variant="h6" color="inherit" noWrap>Batcher Public Key:</Typography>
            <Typography className={classes.SecondText} variant="h6" color="inherit" noWrap>{props.BatcherPublicKey}</Typography>
            </div>
            <div className={classes.CardContentText}>
            <Typography className={classes.Text} style={{marginRight:102}}  variant="h6" color="inherit" noWrap>Nonce:</Typography>
            <Typography className={classes.SecondText} variant="h6" color="inherit" noWrap>{props.Nonce}</Typography>
            </div>
            </CardContent>
        </Card>
        </Grid>
        <Grid item xl={5} sm={5}>
            <Card>
                <CardContent>
                    <Typography variant="h5">Input</Typography>
                </CardContent>
                
                <CardContent className={classes.cardoverflow}>
                    {
                    props.TransactionInput.map((item,i)=>{
                            return(
                            <Typography variant="body1" key={i}>{i+1} - {item}
                             <Divider style={{marginBottom:10}}/>
                            </Typography>
                        ) 
                        }) 
                    }
                </CardContent>
            </Card>
        </Grid>
        <Grid item xl={5} sm={5}>
            <Card>
                <CardContent>
                    <Typography variant="h5">Output</Typography>
                </CardContent>
                <CardContent className={classes.cardoverflow}>
                {
                    props.TransactionOutput.map((item,i)=>{
                            return(
                            <Typography variant="body1" gutterBottom key={i}>{i+1} - {item}
                             <Divider style={{marginBottom:10}}/>
                            </Typography>
                            
                        ) 
                        }) 
                    }
                    
                </CardContent>
            </Card>
        </Grid>

        <Grid item xs={11}>
            <Card>
                <CardContent>
                    <Typography variant="h5">Payload</Typography>
                </CardContent>
                <CardContent variant="body1" className={classes.Payload}>
                    {props.TransactionPayload}
                </CardContent>
            </Card>

        </Grid>
        </Grid>
        </div>
    )
}

export default withStyles(styles)(TransactionDetail);