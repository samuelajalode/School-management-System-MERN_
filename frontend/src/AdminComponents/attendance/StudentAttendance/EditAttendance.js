import React, {useState , useEffect} from 'react'
import  Table from '../../shared/RegisterAttendance';
import axios from '../../../store/axios';
import {errorAlert} from '../../../utils';
import {useParams} from 'react-router-dom'



function RegisterAttendance() {
    const [loading, setloading] = useState(false);
    const {classID, id } = useParams()
    const [students, setstudents] = useState([])


    useEffect(() => {
      if(id){
        axios.get(`/attendance/attendance/${id}`).then(res => {
          console.log(res)
          setstudents(res.data.users) 
        })
      }
    }, [id])


    const handleRegisterAttendance = () => {
      setloading(true)
      axios.put(`/attendance/update/${id}`, {users: students}).then(res => {
        setloading(false)
          if(res.data.error){
               errorAlert(res.data.error);
               return 0
          }
      }).catch(err => {
        console.log(err);
        setloading(false)
        errorAlert("Sorry something when wrong");
      })  
    }

    const handleResetAttendance = () => {
      axios.get(`/attendance/students/${id}`).then(res => {
        console.log(res)
        setstudents(res.data.users) 
      })
    }


    return (
        <div>
            <h3 className="mb-5">
                Edit  {classID} Attendance
            </h3>
              {classID &&    
              <Table  
                 attendanceData={students} 
                 isEdit={true}
                 handleResetAttendance ={ handleResetAttendance }
                 handleRegister={ handleRegisterAttendance }
                 loading={loading}
                 setattendanceData={setstudents}/>}
        </div>
    )
}

export default RegisterAttendance
