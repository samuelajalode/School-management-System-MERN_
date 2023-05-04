import React, { useState, useEffect } from "react";
import { errorAlert, successAlert } from "../../../utils";
import GoBack from "../../shared/GoBack";
import { combineDateAndTime, separateDateandTime } from "../../../utils";
import EditForm from "./CalendarForm";
import axios from "../../../store/axios";
import { useParams } from "react-router-dom";
import moment from "moment";

function EditEvent() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [startday, setstartday] = useState("2021/2/2");
  const [starttime, setstarttime] = useState("00:00:00");
  const [allday, setallday] = useState(true);
  const [endtime, setendtime] = useState("00:00:00");
  const [loading, setloading] = useState(false);
  const [type, settype] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/calendar/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
        return 0;
      }
      const { docs } = res.data;

      settitle(docs.title);
      setdescription(docs.description);
      setallday(docs.allDay);
      const { day, time } = separateDateandTime(docs.start);
      console.log(day);
      setstartday(moment(day).format("YYYY-MM-DD"));
      setstarttime(time);
      const enddate = separateDateandTime(docs.end);
      setendtime(enddate?.time);
    });
  }, [id]);

  console.log(typeof startday);

  const handleEditEvent = () => {
    const start = combineDateAndTime(startday, starttime);
    const end = combineDateAndTime(startday, endtime);
    axios
      .put(`/calendar/update/${id}`, {
        title,
        resource: type,
        allDay: allday,
        day: startday,
        start,
        end,
        type,
        description,
      })
      .then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          setloading(false);
          return 0;
        }
        successAlert("successfully updated");
        setloading(false);
      })
      .catch((err) => {
        errorAlert("sorry something when wrong");
        setloading(false);
      });
  };

  return (
    <>
      <GoBack name="Go back to Events List" link="/academics/calender" />
      <div className="content__container">
        <h3>Edit Event</h3>
        <EditForm
          title={title}
          settitle={settitle}
          setdescription={setdescription}
          description={description}
          starttime={starttime}
          setstarttime={setstarttime}
          startdate={startday}
          setstartdate={setstartday}
          allday={allday}
          setallday={setallday}
          endtime={endtime}
          isEdit={true}
          onSubmit={handleEditEvent}
          loading={loading}
          setendtime={setendtime}
          type={type}
          settype={settype}
        />
      </div>
    </>
  );
}

export default EditEvent;
