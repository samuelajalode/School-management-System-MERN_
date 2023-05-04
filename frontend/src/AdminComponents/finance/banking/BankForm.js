import React from 'react'
import { useForm } from "react-hook-form";

function BankForm({name, bank, number, setnumber, setbank, setname, isEdit, onSubmit, loading}) {

    const { register, handleSubmit, errors } = useForm()

    return (
        <form className="content__container">
            <div className="mb-3">
                <label  className="form-label">Bank Name</label>
                <input 
                onChange={e => setbank(e.target.value)} 
                type="text" 
                ref={register({ required: true })} 
                name="bank"
                value={bank}
                className="form-control" 
                placeholder=""/>
                  {errors.bank && <span className="form-error text-danger mb-2">This field is required</span>}
            </div>
            <div className="mb-3">
                <label  className="form-label">Account Name</label>
                <input 
                name="name"
                onChange={e => setname(e.target.value)} 
                type="text" 
                value={name}
                ref={register({ required: true })} 
                className="form-control" 
                placeholder=""/>
                  {errors.name && <span className=" form-error text-danger mb-2">This field is required</span>}
            </div>
            <div className="mb-3">
                <label  className="form-label">Account Number</label>
                <input 
                name="number" 
                value={number}
                ref={register({ required: true })} 
                onChange={e => setnumber(e.target.value)} 
                type="text" 
                className="form-control" 
                placeholder=""/>
                  {errors.number && <span className=" form-error text-danger mb-2">This field is required</span>}
            </div>  
            <div className="mb-3">
                <button disabled={loading} className="btn blue__btn" onClick={handleSubmit(onSubmit)}>
                     {loading &&  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                     {isEdit ? "Edit" : "Create"} 
                </button>
            </div> 
        </form>
    )
}

export default BankForm
