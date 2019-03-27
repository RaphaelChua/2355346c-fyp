import React ,{ Component }from 'react';
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
        minWidth: 800,
    },
    Tc:{
        // whiteSpace: "nowrap",
        margin: 5,
        maxWidth: 500,
        overflow: "hidden",
        textOverflow: "ellipsis"
        // overflow:"auto"
    },
    Bn:{
        width:0
    },
    Tr:{
        '&:hover':{
            backgroundColor: "rgba(0, 0, 0, 0.08)"
        }
    }
})

const Block = props => {
    const { classes , theme } = props;
    return(
        <div>

            <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.Bn}>BLOCK NUMBER</TableCell>
                        <TableCell>BLOCK ID</TableCell>
                        <TableCell>SIGNER</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    props.Blocks.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((item,i) =>{
                      return(  
                     
                            <TableRow className={classes.Tr} key={i} onClick={()=>props.BlockDetails(item)} >
                                <TableCell className={classes.Bn}>{item.header.block_num}</TableCell>
                                <TableCell className={classes.Tc}>{item.header_signature}</TableCell>
                                <TableCell className={classes.Tc}>{item.header.signer_public_key}</TableCell>
                                <TableCell className={classes.Tc}></TableCell>
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
            count={props.Blocks.length}
            page={props.page}
            rowsPerPage={props.rowsPerPage}
            onChangePage={props.handleChangePage}
            onChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
            </Paper>
        </div>
    );
}


export default withStyles(styles)(Block);