import React, {useEffect, useState} from 'react';
import StudentInfo from './UserInfo';
import StudentTabs from './StudentTabs';
import axios from '../../../store/axios';
import { useParams} from 'react-router-dom'
import {errorAlert} from '../../utils'

function StudentDetails() {
    const [details, setdetails] = useState(null);

    const {id} =useParams()

    useEffect(() => {
        axios.get(`/students/student/${id}`).then(res => {
             if(res.data.error){
                 errorAlert(res.data.error)
                 return 0
             }
             setdetails(res.data.student)
        })
       
    }, [id])



    return (
        <div className="student__details">
            <h3>Student Details</h3>
            <div className="row">
                {details ? <> 
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <StudentInfo 
                    name={details?.name} 
                    surname={details?.surname} 
                    middleName={details?.middleName} 
                    role={details?.role} 
                    id={details?.userID}/>   
                </div>
                <div className="col-xs-12 col-sm-6 col-md-8">
                    <StudentTabs user={details}/>
                </div>
                </> : <h1 className="text-danger text-center">Student not found</h1>}
            </div>
        </div>
    )
}

export default StudentDetails
