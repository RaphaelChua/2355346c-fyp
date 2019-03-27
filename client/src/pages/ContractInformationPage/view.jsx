import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import DownloadIcon from '@material-ui/icons/CloudDownload'

const styles = theme =>({
    root: {
        flexGrow: 1
    },
    Tc:{
        // whiteSpace: "nowrap",
        // margin: 5,
        maxWidth: 230,
        // overflow: "hidden",
        // textOverflow: "ellipsis",
        overflow:"auto"
    },
    Bn:{
        // width:0,
        minWidth:100,
        overflow:"auto",
        // overflow: "hidden",
        // textOverflow: "ellipsis"
    },
    Tr:{
        '&:hover':{
            backgroundColor: "rgba(0, 0, 0, 0.08)"
        }
        // '&:hover': {
        //     boxShadow: "-1px 1px 5px 0px" 
        //   }
    },
    table1:{
        width:800,
    }
})

const ContractInformation = props => {

    const { classes, theme } = props;

    return(
        <div className={classes.root}>
        <Grid container spacing={24} >
        <Grid item xs={11} className={classes.table1}>
            <Typography variant="h6">
                                Status
                            </Typography>   
              <Paper className={classes.proot}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Remarks</TableCell>
                        <TableCell>Video Hash ID</TableCell>
                        <TableCell>Video Encoded ID</TableCell>
                        <TableCell>Download</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                
                    props.StatusOnDeliveryProduct.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                    .map((item,i) =>{
                      return(  
                     
                            <TableRow className={classes.Tr} key={i}>
                                <TableCell className={classes.Bn}>{item.Remarks}</TableCell>
                                <TableCell className={classes.Tc}>{item.Video_HashID}</TableCell>
                                <TableCell className={classes.Tc}>{item.Video_Encoded_ID}</TableCell>
                                <TableCell className={classes.Tc}><DownloadIcon onClick={()=>props.DownloadVideo(item.Video_Encoded_ID)}/></TableCell>
                             
                            </TableRow>
                      )
                    })
                }
                 </TableBody>
            </Table>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
            count={props.StatusOnDeliveryProduct.length}
            page={props.page}
            rowsPerPage={props.rowsPerPage}
            onChangePage={props.handleChangePage}
            onChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
            </Paper>
            </Grid>


            <Grid item xs={11} className={classes.table1}>
            <Typography variant="h6">
                                Status Infomation
                            </Typography>   
              <Paper className={classes.proot}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Remarks</TableCell>
                        <TableCell>Temperature</TableCell>
                        <TableCell>Pressure</TableCell>
                        <TableCell>Humidity</TableCell>
                        <TableCell>Movement</TableCell>
                        <TableCell>Environment</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                
                    props.StatusInfoOnDeliveryProduct.slice(props.page2 * props.rowsPerPage2, props.page2 * props.rowsPerPage2 + props.rowsPerPage2)
                    .map((item,i) =>{
                      return(  
                     
                            <TableRow className={classes.Tr} key={i}>
                                <TableCell className={classes.Bn}>{item.Remarks}</TableCell>
                                <TableCell className={classes.Tc}>{item.Temperature}</TableCell>
                                <TableCell className={classes.Tc}>{item.Pressure}</TableCell>
                                <TableCell className={classes.Tc}>{item.Humidity}</TableCell>
                                <TableCell className={classes.Tc}>{item.Movement}</TableCell>
                                <TableCell className={classes.Tc}>{item.Environment}</TableCell>
                                <TableCell className={classes.Tc}>{item.Date}</TableCell>
                            </TableRow>
                      )
                    })
                }
                 </TableBody>
            </Table>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
            count={props.StatusInfoOnDeliveryProduct.length}
            page={props.page2}
            rowsPerPage={props.rowsPerPage2}
            onChangePage={props.handleChangePage2}
            onChangeRowsPerPage={props.handleChangeRowsPerPage2}
            />
            </Paper>
            </Grid>



            <Grid item xs={11} className={classes.table1}>
            <Typography variant="h6">
                                Environment Status
                            </Typography>   
              <Paper className={classes.proot}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Remarks</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Pressure</TableCell>
                        <TableCell>Latitude</TableCell>
                        <TableCell>Longitude</TableCell>
                        <TableCell>Temperature</TableCell>
                        <TableCell>Humidity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                
                    props.StatusOnEnvironment.slice(props.page3 * props.rowsPerPage3, props.page3 * props.rowsPerPage3 + props.rowsPerPage3)
                    .map((item,i) =>{
                      return(  
                     
                            <TableRow className={classes.Tr} key={i}>
                                <TableCell className={classes.Bn}>{item.Remarks}</TableCell>
                                <TableCell className={classes.Tc}>{item.Date}</TableCell>
                                <TableCell className={classes.Tc}>{item.Pressure}</TableCell>
                                <TableCell className={classes.Tc}>{item.Latitude}</TableCell>
                                <TableCell className={classes.Tc}>{item.Longitude}</TableCell>
                                <TableCell className={classes.Tc}>{item.Temperature}</TableCell>
                                <TableCell className={classes.Tc}>{item.Humidity}</TableCell>
                            </TableRow>
                      )
                    })
                }
                 </TableBody>
            </Table>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
            count={props.StatusOnEnvironment.length}
            page={props.page3}
            rowsPerPage={props.rowsPerPage3}
            onChangePage={props.handleChangePage3}
            onChangeRowsPerPage={props.handleChangeRowsPerPage3}
            />
            </Paper>
            </Grid>



            <Grid item xs={11} className={classes.table1}>
            <Typography variant="h6">
                                Movement Status
                            </Typography>   
              <Paper className={classes.proot}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Remarks</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Latitude</TableCell>
                        <TableCell>Longitude</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                
                    props.StatusOnMovement.slice(props.page4 * props.rowsPerPage4, props.page4 * props.rowsPerPage4 + props.rowsPerPage4)
                    .map((item,i) =>{
                      return(  
                     
                            <TableRow className={classes.Tr} key={i}>
                                <TableCell className={classes.Bn}>{item.Remarks}</TableCell>
                                <TableCell className={classes.Tc}>{item.Date}</TableCell>
                                <TableCell className={classes.Tc}>{item.Latitude}</TableCell>
                                <TableCell className={classes.Tc}>{item.Longitude}</TableCell>
                            </TableRow>
                      )
                    })
                }
                 </TableBody>
            </Table>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
            count={props.StatusOnMovement.length}
            page={props.page4}
            rowsPerPage={props.rowsPerPage4}
            onChangePage={props.handleChangePage4}
            onChangeRowsPerPage={props.handleChangeRowsPerPage4}
            />
            </Paper>
            </Grid>
        
        
        </Grid>
        </div>
    );

}

export default withStyles(styles)(ContractInformation);