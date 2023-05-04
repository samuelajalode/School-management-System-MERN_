import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useForm } from "react-hook-form";

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
  


function EditPrefects({open, setopen,
        name, percentage , setname, 
        setpercentage, loading , types, settypes,
        onEdit}) {

    const { register, handleSubmit, errors } = useForm();

    const checkedAll = () => {
        return (types?.tuition === true && 
            types?.facility === true && 
            types?.maintenance === true && 
            types?.examination === true && 
            types?.transportation === true) ? true : false
             
     }
 
     const handleSelectAll = (e) => {
         if(e.target.checked){
             settypes({
                 tuition: true,
                 facility: true,
                 maintenance: true,
                 examination: true,
                 transportation: true
               })
         }
         else{
             settypes({
                 tuition: false,
                 facility: false,
                 maintenance: false,
                 examination: false,
                 transportation: false
               })
         }   
     }
 

    return (
        <Dialog 
             fullWidth={true}
             maxWidth="sm"
             onClose={() => setopen(false)} 
             aria-labelledby="customized-dialog-title" 
             open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={() => setopen(false)}>
                          Edit Prefect Details
                    </DialogTitle>
                    <DialogContent dividers>
                        <form action="">
                              <div className="row mb-3">
                                <label  className="col-sm-3 col-form-label">Name</label>
                                <div className="col-sm-9">
                                    <input 
                                    value={name}
                                    onChange={e => setname(e.target.value)}
                                    type="text" 
                                    ref={register({ required: true })} 
                                    className="form-control" 
                                    name="name"/>
                                    {errors.name && <span className=" form-error text-danger mb-2">This field is required</span>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label  className="col-sm-3 col-form-label">Percentage</label>
                                <div className="col-sm-9">
                                    <input 
                                    value={percentage}
                                    onChange={e => setpercentage(e.target.value)}
                                    ref={register({ required: true })} 
                                    type="number" 
                                    className="form-control" 
                                    name="percentage"/>
                                    {errors.percentage && <span className=" form-error text-danger mb-2">This field is required</span>}
                                </div>
                            </div>
                            <div className="row mb-3">
            <label  className="col-sm-3 col-form-label">Fee type Affected</label>
                <div className="col-sm-9">
                   <div className="form-check">
                     <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="exampleRadios" 
                        id="exampleRadios1"
                        checked={checkedAll()}
                        value="option1" onChange={handleSelectAll}/>
                     <label className="form-check-label" for="exampleRadios1">
                         Select All
                     </label>
                   </div>
                   <hr/>
                  <div className="form-check">
                     <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="exampleRadios" 
                      id="exampleRadios1" 
                      value="option1" 
                      onChange={() => settypes({...types, tuition: !types?.tuition})}
                      checked={types?.tuition}/>
                     <label className="form-check-label" for="exampleRadios1">
                         Tuition Fee
                   </label>
                 </div>
                 <div className="form-check">
                    <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="exampleRadios" 
                    id="exampleRadios2" 
                    value="option2" 
                    onChange={() => settypes({...types, facility: !types?.facility})}
                    checked={types?.facility}/>
                    <label className="form-check-label" for="exampleRadios2">
                        Facility User Fee
                    </label>
                </div>
                <div className="form-check">
                    <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="exampleRadios" 
                    id="exampleRadios2" 
                    value="option3" 
                    onChange={() => settypes({...types, maintenance: !types.maintenance})}
                    checked={types.maintenance}/>
                    <label className="form-check-label" for="exampleRadios2">
                        Facility maintenance fee
                    </label>
                </div>
                <div className="form-check">
                    <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="exampleRadios" 
                    id="exampleRadios2" 
                    value="option4" 
                    onChange={() => settypes({...types, examination: !types.examination})}
                    checked={types.examination}/>
                    <label className="form-check-label" for="exampleRadios2">
                        Examination fee
                    </label>
                </div>
                <div className="form-check">
                    <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="exampleRadios" 
                    id="exampleRadios2" 
                    value="option5" 
                    onChange={() => settypes({...types, transportation: !types.transportation})}
                    checked={types.transportation}/>
                    <label className="form-check-label" for="exampleRadios2">
                        Transportation fee
                    </label>
                </div>
            </div>
            </div>
                           
                           <div className="row mb-3">
                        <div  className="offset-sm-3">
                            <button 
                             disabled={loading}
                              onClick={handleSubmit(onEdit)}
                                className="btn blue__btn ">
                                    {loading &&
                                       <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                     }
                                Save Changes
                            </button>
                            <button 
                              onClick={(e) => { e.preventDefault(); setopen(false)}}
                                className="btn btn-danger ml-3">
                                Cancel
                            </button>
                        </div>
                    </div>
                        </form>
                    </DialogContent>
                </Dialog>
    )
}

export default EditPrefects
