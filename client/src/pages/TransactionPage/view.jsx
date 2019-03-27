import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const styles = theme => ({
    root:{
        flexGrow:0,
    },
    table:{
        maxWidth: 800,
    },
    Tc:{
        // whiteSpace: "nowrap",
        margin: 5,
        maxWidth: 300,
        overflow: "hidden",
        textOverflow: "ellipsis"
        // overflow:"auto"
    },
    Bn:{
        width:0,
        maxWidth:550,
        // overflow:"auto"
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    Tr:{
        '&:hover':{
            backgroundColor: "rgba(0, 0, 0, 0.08)"
        }
        // '&:hover': {
        //     boxShadow: "-1px 1px 5px 0px" 
        //   }
    }
})

const Transaction = props => {
    const { classes , theme } = props;

    
    return(
        <div>
          
          <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>TRANSACTION ID</TableCell>
                        <TableCell>TRANSACTION FAMILY</TableCell>
                        <TableCell>VERSION</TableCell>
                        <TableCell>PAYLOAD</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    props.Transaction.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                    .map((item,i) =>{
                      return(  
                     
                            <TableRow className={classes.Tr} key={i} onClick={()=>props.TransactionDetails(item)}>
                                <TableCell className={classes.Bn}>{item.header_signature}</TableCell>
                                <TableCell className={classes.Tc}>{item.header.family_name}</TableCell>
                                <TableCell className={classes.Tc}>{item.header.family_version}</TableCell>
                                <TableCell className={classes.Tc}>{item.payload}</TableCell>
                                <TableCell></TableCell>
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
            count={props.Transaction.length}
            page={props.page}
            rowsPerPage={props.rowsPerPage}
            onChangePage={props.handleChangePage}
            onChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
            </Paper>

        </div>
    );
}



export default withStyles(styles)(Transaction);