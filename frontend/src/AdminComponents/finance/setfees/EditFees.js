
import FeeForm from './FeeForm'
import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {errorAlert, successAlert} from '../../../utils';
import axios from '../../../store/axios'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);




export default function CustomizedDialogs({open, setOpen, fee,  setfees, fees}) {
    const [classID, setclass] = useState("")
    const [type, settype] = useState("");
    const [tution, settution] = useState("");
    const [facility, setfacility] = useState("");
    const [maintenance, setmaintenance] = useState("");
    const [exam, setexam] = useState("")

    useEffect(() => {
        setclass(fee?.classID || "")
        settype(fee?.type || "")
        settution(fee?.tution || "");
        setfacility(fee?.facility || "");
        setmaintenance(fee?.maintenance || "");
        setexam(fee?.exam || "")
    }, [fee])

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if(classID && type){
    var obj = {};
    var results = {
        tution,
        facility,
        maintenance,
        exam
    }
    if(type === "day"){
        obj =  {
            day: results
         }
    }
    else if(type === "freshDay"){
        obj =  {
            freshDay: results
         }
    }
    else if(type === "freshBorder"){
        obj =  {
            freshBorder: results
         }
    }
    else if(type === "border"){
        obj =  {
            border: results
         }
    }
    else{
        return 0
    }
     axios.post('/fees/add',{name: classID, ...obj}).then(res => {
         if(res.data.error){
             errorAlert(res.data.error);
             return 0;
         }
         console.log(res.data)
         successAlert("successfully created");
         settution("");
         setfacility("");
         setmaintenance("");
         setclass("");
         let newfees = fees
         let index = fees.findIndex(i => i._id === res.data.docs?._id);
         newfees[index] = res.data.docs
         //let filteredData = fees.filter(i => i._id !== res.data.docs?._id)
         setfees(newfees)
         setexam("");
         settype("");
         settution("");
         setOpen(false);

     }).catch(err => {
         console.log(err)
        errorAlert("Error");
     })
    }
    else{
       errorAlert("Fill in all fields") 
    }
}

  return (
    <div>
      <Dialog 
      onClose={handleClose} 
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="customized-dialog-title" 
      open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Set Fees for <strong className="text-info"> {fee?.classID} - {fee?.type}</strong>  
        </DialogTitle>
        <DialogContent dividers>
        <FeeForm 
              tution={tution}
              settution={settution}
              setfacility={setfacility}
              facility={facility}
              maintenance={maintenance}
              setmaintenance={setmaintenance}
              exam={exam}
              setexam={setexam}
              classID={classID}
              setclass={setclass}
              type={type}
              isEdit={true}
              settype={settype}
              onSubmit={handleSubmit}
           />
         
        </DialogContent>
      </Dialog>
    </div>
  );
}
