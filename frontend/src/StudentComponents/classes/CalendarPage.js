import React, {useState,  useEffect} from 'react';
import TableList from '../../AdminComponents/shared/ListTable';
import axios from '../../store/axios'


const tableHeader = [
    {id: "resourse", name: "Type"},
    {id: "title", name: "Event"},
    {id: "start", name: "Starts"},
    {id: "end", name: "Ends"},

]

function ExamsPage() {
    const [loading, setloading] = useState(false);
    const [events, setevents] = useState([]);

    useEffect(() => {
        setloading(true)
        axios.get('/calendar')
        .then(res => {
            setloading(false)
            setevents(res.data)
        })
       
    }, [])
   
    return (
        <div>
            <h3 className="mb-5">Upcoming School Events</h3>
           <TableList 
           data={events} 
           tableHeader={tableHeader} 
           noActions={true}
           loading={loading}/>
        </div>
    )
}

export default ExamsPage
