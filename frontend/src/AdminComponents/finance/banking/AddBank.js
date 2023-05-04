import React, { useState } from 'react'
import BankForm from './BankForm';
import axios from '../../../store/axios';
import {errorAlert, successAlert} from '../../../utils';
import {Link} from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


function AddBank() {
    const [name, setname] = useState("");
    const [bank, setbank] = useState("");
    const [number, setnumber] = useState("");
    const [loading, setloading] = useState(false)


    const handleAdd = () => {
        setloading(true)
        axios.post('/banking/create', {
            bankName: bank,
            accountName: name,
            accountNumber: number
        }).then(res => {
            setloading(false)
            if(res.data.error){
                 errorAlert(res.data.error);
                 return 0;
            }
            successAlert("successfully created.");
            setname("");
            setbank("");
            setnumber("");
        }).catch(err => {
            setloading(false);
            errorAlert("something went wrong");
        })
    }

    return (
        <div>
             <div className="d-flex justify-content-end">
                <Link to="/finance/banking">
                    Back to Banks List
                    <ArrowForwardIosIcon />
                </Link>
            </div>
            <h3>Add new Bank</h3>
            <BankForm 
              name={name} 
              bank={bank} 
              number={number} 
              loading={loading}
              setnumber={setnumber} 
              setbank={setbank} 
              setname={setname} 
              onSubmit={handleAdd}
            />
            
        </div>
    )
}

export default AddBank
