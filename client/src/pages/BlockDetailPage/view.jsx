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
    card:{
        maxWidth: 1200,
        width:'auto',
        height:'auto',
        padding:10
    },
    CellKey:{
        width:250,
        textAlign:'right',
        // borderBottom:'none',
        fontSize:'1.25rem',
        fontWeight:500,
        lineHeight:1.6,
        letterSpacing:'0.0075em',
        paddingRight:0
      
    },
    CellValue:{
        // borderBottom:'none',
        fontSize:'1.25rem',
        fontWeight:500,
        lineHeight:1.6,
        letterSpacing:'0.0075em',
        whiteSpace:'normal',
        wordBreak:'break-all',
    },
    tableRow:{
    //    padding:100
    }

})


const BlockDetail = props =>{
    const { classes , theme } = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={24} className={classes.GridContainer}>
                <Grid item xl={10} className={classes.GridItem}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="inherit" noWrap className={classes.Text2}>Block ID: </Typography>
                            <Typography variant="h6" color="inherit" noWrap className={classes.Text3}> {props.BlockID}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                        <Table>
                            <TableBody>
                            <TableRow className={classes.tableRow}>
                                <TableCell className={classes.CellKey}>Block Number</TableCell>
                                <TableCell className={classes.CellValue}>{props.BlockNum}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.CellKey}>Previous Block ID</TableCell>
                                <TableCell className={classes.CellValue}>{props.PreviousBlockID}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell  className={classes.CellKey}>Consensus</TableCell>
                                <TableCell className={classes.CellValue}>{props.Consensus}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell  className={classes.CellKey}>Signer Public Key</TableCell>
                                <TableCell className={classes.CellValue}>{props.SignerPublicKey}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.CellKey}>State Root Hash</TableCell>
                                <TableCell className={classes.CellValue}>{props.StateRootHash}</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </div>
        )
    }
    
    export default withStyles(styles)(BlockDetail);