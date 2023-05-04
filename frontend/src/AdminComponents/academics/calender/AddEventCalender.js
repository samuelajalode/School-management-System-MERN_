import React, {useState} from 'react'
import AddForm from './CalendarForm';
import axios from '../../../store/axios';
import {errorAlert, successAlert} from '../../../utils'
import GoBack from '../../shared/GoBack'
import {combineDateAndTime} from '../../../utils'

function AddCalender() {
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("");
    const [startday, setstartday] = useState("");
    const [starttime, setstarttime] = useState("00:00:00");
    const [allday, setallday] = useState(true);
    const [endtime, setendtime] = useState("00:00:00");
    const [loading, setloading] = useState(false);
    const [type, settype] = useState("")

    const handleAddEvent = () => {
        setloading(true)
        const start = combineDateAndTime(startday , starttime);
        const end = combineDateAndTime(startday , endtime );
        console.log(start , end)
        axios.post('/calendar/create', 
        {
          title,
          resource: type, 
          allDay: allday, 
          day: startday,
          start,
          end ,
          description
        })
        .then(res => {
              if(res.data.error){
                   errorAlert(res.data.error);
                   setloading(false)
                   return 0
              }
              successAlert("successfully created")
              setloading(false)
              setallday(true)
              settitle("");
              setdescription("");
              settype("");
              setstartday()
              setendtime("00:00:00");
              setstarttime("00:00:00")
        })
        .catch(err => {
            errorAlert("sorry something when wrong");
            setloading(false)
        })

       
    }

    return (
        <>
        <GoBack  name="Go back to Events List" link="/academics/calender"/>
        <div  className="content__container">
            <h3>Add New Event</h3>
            <AddForm 
                title= {title}
                settitle ={settitle}
                setdescription = {setdescription}
                description = {description} 
                starttime = {starttime}
                setstarttime = {setstarttime}
                startdate = {startday}
                setstartdate = {setstartday}
                allday = {allday}
                setallday = {setallday}
                endtime = {endtime}
                onSubmit = {handleAddEvent}
                loading ={loading}
                setendtime ={setendtime}
                type = {type}
                settype = {settype}
            />
        </div>
        </>
    )
}

export default AddCalender
