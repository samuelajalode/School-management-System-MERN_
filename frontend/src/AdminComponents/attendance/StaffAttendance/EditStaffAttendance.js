import React, {useState , useEffect} from 'react'
import  Table from '../../shared/RegisterAttendance';
import axios from '../../../store/axios';
import {errorAlert} from '../../../utils';
import {useParams} from 'react-router-dom'



function RegisterAttendance() {
    const [loading, setloading] = useState(false);
    const { id } = useParams()
    const [staff, setstaff] = useState([])


    useEffect(() => {
      if(id){
        axios.get(`/attendance/attendance/${id}`).then(res => {
          console.log(res)
          setstaff(res.data.users) 
        })
      }
    }, [id])


    const handleRegisterAttendance = () => {
      setloading(true)
      axios.put(`/attendance/update/${id}`, {users: staff}).then(res => {
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
    };

    const handleResetAttendance = () => {
      axios.get(`/attendance/attendance/${id}`).then(res => {
        console.log(res)
        setstaff(res.data.users) 
      })
    };


    return (
        <div>
            <h3 className="mb-5">
                Edit Staff Attendance
            </h3>
              <Table  
                 attendanceData={staff} 
                 isEdit={true}
                 isStaff={true}
                 handleResetAttendance ={ handleResetAttendance }
                 handleRegister={ handleRegisterAttendance }
                 loading={loading}
                 setattendanceData={setstaff}/>
        </div>
    )
}

export default RegisterAttendance
