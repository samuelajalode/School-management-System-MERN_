import React from 'react';
import AttendanceTable from '../shared/AttendanceTable'
import SearchAttendance from './SearchAttendance';

function Attendence() {


    const attendanceData = [
        { studentID: "BK2021",name:'Frozen', lastname:'yoghurt'},
        { studentID: "BK2021",name:'Frozen', lastname:'yoghurt'},
        { studentID: "BK2021",name:'Frozen', lastname:'yoghurt'},
        { studentID: "BK2021",name:'Frozen', lastname:'yoghurt'},
        { studentID: "BK2021",name:'Frozen', lastname:'yoghurt'},
        { studentID: "BK2021",name:'Frozen', lastname:'yoghurt'},
        { studentID: "BK2021",name:'Frozen', lastname:'yoghurt'},
      ];
    return (
        <div>
            <SearchAttendance/>
            <AttendanceTable attendanceData={attendanceData}/>
        </div>
    )
}

export default Attendence
