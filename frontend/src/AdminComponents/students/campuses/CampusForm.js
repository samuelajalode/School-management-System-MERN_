import React from 'react'
import { useForm } from "react-hook-form";


function CampusForm({name, setname, location, setlocation, onSubmit, isEdit, loading}) {
    const { register, handleSubmit, errors } = useForm();

    return (
        <form action="">
                <div className="row mb-3">
                    <label  className="col-xs-12 col-md-3  col-form-label">Name</label>
                    <div className="col-sm-12 col-md-9">
                        <input 
                        type="text" 
                        value={name}
                        ref={register({ required: true })} 
                        onChange={e => setname(e.target.value)}
                        className="form-control" 
                        name="name"/>
                         {errors.name && <span className=" form-error text-danger mb-2">This field is required</span>}
                    </div>
                </div>
                <div className="row mb-3">
                    <label  className="col-xs-12 col-md-3 col-form-label">Location</label>
                    <div className="col-sm-12 col-md-9">
                        <textarea 
                        rows={3} 
                        value={location}
                        onChange={e => setlocation(e.target.value)}
                        className="form-control" 
                        id="location"></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className=" offset-md-3 col-xs-12 col-md-9">
                        <button 
                        disabled={loading}
                        onClick={handleSubmit(onSubmit)} 
                        className="btn blue__btn">
                            {loading &&  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {isEdit ? "Save Changes" : "Add"}
                        </button>
                    </div>
                    
                </div>
        </form>
    )
}

export default CampusForm
