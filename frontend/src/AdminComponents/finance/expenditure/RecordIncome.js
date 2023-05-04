import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import axios from '../../../store/axios';
import {errorAlert, successAlert} from '../../../utils'
import { bankOptions, incomeCat} from '../../../data'


function RecordExpenditure() {

    const [date, setdate] = useState("");
    const [chequeNo, setchequeNo] = useState("");
    const [loading, setloading] = useState(false);
    const [paymentType, setpaymentType] = useState("");
    const [category, setcategory] = useState("")
    const [bank, setbank] = useState("");
    const [amount, setamount] = useState("");
    const [description, setdescription] = useState("")

    const { register, handleSubmit,  errors } = useForm();
    
    const handleCreate = () => {
            setloading(true)
             axios.post('/transactions/create', {
                 date,
                 amount,
                 paymentMethod: paymentType,
                 type: "income",
                 category,
                 description,
                 chequeNumber: chequeNo,
                 bank
             }).then(res => {
                setloading(false)
                 if(res.data.error){
                     errorAlert(res.data.error)
                 }
                 successAlert("Payment successfully made")
                 setamount();
                 setbank("");
                 setbank("");
                 setpaymentType("");
                 setcategory("");
                 setdate("");
                 setdescription("");
             }).catch(() => {
                setloading(false);
                errorAlert("Transaction Failed")
             })
    }

    return (
        <div className="content__container">
            <h3>Record An Income</h3>
            <form action="">
                    <div className=" mb-3">
                         <label  
                         className=" col-form-label">
                           Issued  Date 
                        </label>
                         <div className="">
                              <input 
                              type="date" 
                              value={date}
                              ref={register({ required: true})} 
                              onChange={e => setdate(e.target.value)}
                              className="form-control" 
                              name="date"/>
                               {errors.date && <div className="text-danger">This field is required</div>}
                        </div>
                   </div>
                   <div className=" mb-3">
                        <label 
                            className=" col-form-label">
                            Amount
                        </label>
                         <div className="">
                              <input 
                              type="number" 
                              ref={register({ required: true})} 
                              value={amount}
                              onChange={e => setamount(e.target.value)}
                              className="form-control" 
                              name="amount" 
                              placeholder="Enter amount in $"/>
                              {errors.amount && <div className="text-danger">This field is required</div>}
                        </div>
                   </div>
                   <div className=" mb-3">
                        <label  className=" col-form-label">
                            Income Category
                        </label>
                         <div className="">
                             <select 
                                 value={category}
                                 ref={register({ required: true})} 
                                 onChange={e => setcategory(e.target.value)}
                                 name="category" 
                                className="form-select">
                                    <option hidden defaultValue>Choose...</option>
                                    {incomeCat && 
                                    incomeCat.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                 </div>
                   <div className=" mb-3">
                        <label  className=" col-form-label">
                            Income Type
                        </label>
                         <div className="">
                             <select 
                                 value={paymentType}
                                 ref={register({ required: true})} 
                                 onChange={e => setpaymentType(e.target.value)}
                                 name="students" 
                                className="form-select">
                                    <option hidden defaultValue>Choose...</option>
                                    <option value="cash">Cash</option>
                                    <option value="cheque">Cheque</option>
                                    <option value="bank-deposit">Bank Deposit</option>
                                    <option value="other">Other</option>
                            </select>
                        </div>
                 </div>
                 {paymentType === "bank-deposit" && 
                               <div className=" mb-3">
                                     <label  className=" col-form-label">
                                       Bank
                                    </label>
                                    <div className="">
                                        <select 
                                            value={bank}
                                            ref={register({ required: true})} 
                                            onChange={e => setbank(e.target.value)}
                                            name="students" 
                                            className="form-select">
                                                <option hidden defaultValue>Choose...</option>
                                                {bankOptions && bankOptions.map(e => <option key={e} value={e}>{e}</option>)}
                                        </select>
                                    </div>
                                </div>}
                 {paymentType === ("cheque") &&
                    <>
                    <div className=" mb-3">
                         <label  className=" col-form-label">
                           Bank
                        </label>
                        <div className="">
                            <select 
                                value={bank}
                                ref={register({ required: true})} 
                                onChange={e => setbank(e.target.value)}
                                name="students" 
                                className="form-select">
                                    <option hidden defaultValue>Choose...</option>
                                    {bankOptions && bankOptions.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                      </div>
                      <div className="mb-3">
                            <label  
                                className=" col-form-label">
                                  Cheque Number
                            </label>
                            <div className="">
                                <input 
                                type="text" 
                                className="form-control" 
                                value={chequeNo}
                                onChange={e => setchequeNo(e.target.value)}
                                name="cheque"/>
                            </div>
                     </div>
                  </>}
                   <div className="mb-3">
                        <label  
                            className=" col-form-label">
                           Description
                        </label>
                         <div className="">
                              <textarea 
                              rows={5} 
                               className="form-control" 
                               value={description}
                               onChange={e => setdescription(e.target.value)}
                               name="description"/>
                        </div>
                 </div>
                 <div className=" mb-3">
                         <div className="">
                              <button 
                                 disabled={loading}
                                 onClick={handleSubmit(handleCreate)}
                                 className="btn blue__btn">
                                     {loading &&  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                  Record Payment
                                </button>
                        </div>
                 </div>
            </form>
        </div>
    )
}

export default RecordExpenditure
