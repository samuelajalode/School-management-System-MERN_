import React from 'react';
import CampusForm from './CampusForm';


function AddCampus({name, location , setname, setlocation, onSubmit, loading}) {
    return (
        <div className="content__container">
            <h3 className="mb-4">Add Campus</h3>
            <CampusForm
              name={name}
              location={location}
              setname={setname}
              setlocation={setlocation}
              onSubmit={onSubmit}
              loading={loading}
             />
        </div>
    )
}

export default AddCampus
