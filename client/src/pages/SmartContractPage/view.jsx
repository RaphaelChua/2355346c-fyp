import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { MenuItem, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    formsize:{
        maxWidth:'60vh',
        padding:20
    },
    GridMaxWidth:{
      minWidth:'150vh',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      TypoPadding:{
          paddingTop:20
      },
    inputPadding:{
      paddingBottom:15,
    },
    inputButton:{
      paddingTop:10,
    },
    receipt:{
      marginLeft:20,
      marginTop:10,
      width:'60vh'
      // marginLeft:40,
      // width:1000,
    },
    receiptText:{
      textAlign:'end'
    }
      

})


const SmartContract = props => {

    const { classes, theme } = props;

    return(
        <div>
    
      <Grid container spacing={24} className={classes.GridMaxWidth}>
        <Grid className={classes.formsize} item xs={10}>
        <Grid item xs={12} className={classes.inputPadding}>
        <Typography variant="h6">
        Order Form
      </Typography>
          <TextField
            required
            id="supplierName"
            name="SupplierName"
            label="Supplier Address"
            onChange={props.handleChange}
            fullWidth
            autoComplete="Oname"
          />
        </Grid>
        <Grid item xs={12} className={classes.inputPadding}>
            <TextField
            required
            id="distributerAddress"
            name="DistributorName"
            onChange={props.handleChange}
            value={props.DistributorName}
            label="Distributer Address"
            fullWidth
            autoComplete="Daddr"
            />
        </Grid>
        <Grid item xs={12} className={classes.inputPadding}>
            <TextField
            required
            id="thirdPartyLogisticsAddress"
            name="ThirdPartyLogisticsName"
            onChange={props.handleChange}
            label="3pl Address"
            fullWidth
            autoComplete="3PLaddr"
            />
        </Grid>
        <Grid item xs={12} className={classes.inputPadding}>
            <TextField
            required
            id="buyerAddress"
            name="ConsumerName"
            onChange={props.handleChange}
            label="Retailer Address"
            fullWidth
            autoComplete="Caddr"
            />
        </Grid>
        <Grid item xl={4}>
            <Typography variant="h6" className={classes.TypoPadding}>Chicken</Typography>
        </Grid>
        <Grid item xl={4}>
        <FormControl className={classes.formControl} >
     
        <InputLabel htmlFor="chicken-qty" required>Quantity</InputLabel>
            <Select
            value={props.qty1}
            name="Quantity"
            onChange={props.handleChange}
            inputProps={{
                name: 'qty1',
                id:'chicken-qty'
            }} >
                <MenuItem value="0">
                <em>0</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
            </Select>
            </FormControl>
        </Grid>
        <Grid item xl={4}>
            <Typography variant="h6" className={classes.TypoPadding}>Fish</Typography>
        </Grid>
        <Grid item xl={4}>
        <FormControl className={classes.formControl} >
     
     <InputLabel htmlFor="fish-qty" required >Quantity</InputLabel>
         <Select
         value={props.qty2}
         name="Quantity"
         onChange={props.handleChange}
         inputProps={{
             name: 'qty2',
             id:'fish-qty'
         }} >
             <MenuItem value="0">
             <em>0</em>
             </MenuItem>
             <MenuItem value={1}>1</MenuItem>
             <MenuItem value={2}>2</MenuItem>
             <MenuItem value={3}>3</MenuItem>
             <MenuItem value={4}>4</MenuItem>
             <MenuItem value={5}>5</MenuItem>
             <MenuItem value={6}>6</MenuItem>
         </Select>
         </FormControl>
        </Grid>
        <Grid item xs={8}  className={classes.inputButton}>
        <Button variant="contained" onClick={()=>{props.handleClickOpen()}}>
        Submit New Contract
      </Button>
      </Grid>
      </Grid>

         <Grid className={classes.receipt}> 
            <Grid style={{marginBottom:20}}>
              <Typography variant="h6">
              Receipt
              </Typography>
            </Grid>
            <Grid className={classes.receiptText}>
                  <Grid> 
                    <Typography variant="body1">
                    {props.receiptname1}  {props.receiptprice1}
                   
                    </Typography> 
                  </Grid>
                  <Grid> 
                    <Typography variant="body1">
                 
                    {props.receiptname2}  {props.receiptprice2}
                    </Typography> 
                  </Grid>

            </Grid>
            <Divider />
            <Grid style={{marginTop:15,textAlign:'end'}}>
            <Typography variant="h6">
              Total
              </Typography>
              <Grid>
              <Typography variant="body1">
                ${props.totalprice}
                </Typography> 
              </Grid>
            </Grid>
           
         </Grid>

      </Grid>


      <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Warning! No reverting of submitted contract"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once clicking submit, there will be no reverting of transaction.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={props.submitTx} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={props.success_open}
        //   onClose={props.success_handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={'sm'}
        >
          <DialogTitle id="alert-dialog-title">Contract is {props.deploymsg}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Contract address - {props.contract_address} <br />
            </DialogContentText>
            <Typography variant="h6"> Transaction Results </Typography>
            {props.tx_1} <br />
            {props.tx_2} 
          </DialogContent>
          <DialogActions>
            <Button disabled={props.disable_button} onClick={props.success_handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
     
        </div>

    )

}

export default withStyles(styles)(SmartContract);