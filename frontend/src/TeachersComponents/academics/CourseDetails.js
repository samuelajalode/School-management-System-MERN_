import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { Link, useParams } from "react-router-dom";
import ListTable from "../../components/courses/NotesTable";
import { getCapitalize, errorAlert } from "../../utils";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "descripton", name: "Topic" },
  { id: "file", name: "File" },
];

function CourseDetails() {
  const [course, setcourse] = useState([]);
  const [loading, setloading] = useState(false);
  const [notes, setnotes] = useState([]);
  const { id, classID } = useParams();
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get(`/courses/courseCode/${id}`).then((res) => {
      setcourse(res.data.docs);
    });
  }, [id]);

  useEffect(() => {
    setloading(true);
    axios.get(`/notes/course/${id}`).then((res) => {
      setloading(false);
      setnotes(res.data.docs);
    });
  }, [id]);

  const handleDelete = (id) => {
    axios.delete(`/notes/delete/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
      }
      setnotes(notes.filter((e) => e._id !== id));
    });
  };

  return (
    <div>
      <div
        style={{ background: "#051f3e" }}
        className="content__container text-center"
      >
        <h3>Course Details</h3>
        <h4> {getCapitalize(course?.name)}</h4>
        <h6>{course?.code}</h6>
      </div>

      <div className="content__container">
        <div className="d-flex justify-content-between">
          <h3>Course Notes</h3>
          <div>
            {user?.role !== "student" && (
              <>
                <Link
                  to={`/academics/courses/add/${course?.code}/${classID}`}
                  className="btn blue__btn mx-2"
                >
                  Add New Note
                </Link>
                <Link
                  to={`/academics/courses/sba/${course?.code}/${classID}`}
                  className="btn blue__btn mx-2"
                >
                  Course S.B.A
                </Link>
                <Link
                  to={`/academics/courses/report/${course?.code}/${classID}`}
                  className="btn blue__btn mx-2"
                >
                  Course Report
                </Link>
              </>
            )}
          </div>
        </div>

        <ListTable
          tableHeader={tableHeader}
          data={notes}
          handleDelete={handleDelete}
          loading={loading}
          noActions={user?.role === "student" ? true : false}
          isEdit={true}
          user={user?.id}
        />
      </div>
    </div>
  );
}

export default CourseDetails;
