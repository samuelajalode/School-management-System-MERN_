import React, { useState, useEffect } from "react";
import Table from "../../AdminComponents/academics/sba/SbaTable";
import Edit from "../../AdminComponents/academics/sba/EditModal";

import axios from "../../store/axios";
import { useParams } from "react-router-dom";
import { errorAlert } from "../../utils";
import { useSelector } from "react-redux";
import { selectacademicYear } from "../../store/slices/schoolSlice";

function SBA() {
  const [students, setstudents] = useState([]);
  const [exam, setexam] = useState("");
  const [openEdit, setopenEdit] = useState(false);
  const [data, setdata] = useState([]);
  const currentYear = useSelector(selectacademicYear);
  const [selectedUser, setselectedUser] = useState({});
  const { id, classID } = useParams();
  const [position, setposition] = useState("");
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [error, seterror] = useState(false);
  const [examMark, setexamMark] = useState("");
  const [classWork, setclassWork] = useState("");
  const [classworkMark, setclassworkMark] = useState("");

  useEffect(() => {
    axios.get(`/classes/classCode/${classID}`).then((res) => {
      if (!res.data.docs?.sba || res.data.docs?.sba === false) {
        seterror(true);
        return errorAlert("SBA not set for this class");
      }
      axios
        .get(
          `/sba/${classID}/${id}/${currentYear?.currentYear}/${currentYear?.currentTerm}`
        )
        .then((result) => {
          setdata(result.data.docs);
          setstudents(result.data.docs?.students);
          setclassworkMark(result.data.docs?.classWork);
          setexamMark(result.data.docs?.exam);
        });
    });
  }, [currentYear, id, classID]);

  const handleEdit = (id) => {
    if (!classworkMark) {
      return errorAlert("Please set  classWork %");
    }
    if (!examMark) {
      return errorAlert("Please set  exam score %");
    }
    setopenEdit(true);
    let selectedStudent = data.students.find((e) => e.userID === id);
    setselectedUser(selectedStudent);
    setexam(selectedStudent?.exam);
    setclassWork(selectedStudent?.classWork);
    setposition(selectedStudent?.position);
  };

  const handleonSubmit = async () => {
    setloadingSubmit(true);
    await axios.put(`/sba/update/${data?._id}`, {
      exam: examMark,
      classWork: classworkMark,
    });
    axios
      .put(`/sba/update/student/${data?._id}/${selectedUser?.userID}`, {
        classWork,
        exam,
        userID: selectedUser?.userID,
        name: selectedUser?.name,
        position: position,
      })
      .then((res) => {
        setopenEdit(false);
        setloadingSubmit(false);
        setstudents(res.data.doc?.students);
      });
  };

  return (
    <div>
      {error ? (
        <div>SBA is not set for this class</div>
      ) : (
        <>
          <Table
            setclassWork={setclassWork}
            rows={students}
            handleEdit={handleEdit}
            examMark={examMark}
            setexamMark={setexamMark}
            classworkMark={classworkMark}
            setclassworkMark={setclassworkMark}
          />
          <Edit
            name={selectedUser?.name}
            userID={selectedUser?.userID}
            exam={exam}
            classworkMark={classworkMark}
            examMark={examMark}
            classID={classID}
            loading={loadingSubmit}
            setposition={setposition}
            position={position}
            setexam={setexam}
            setclassWork={setclassWork}
            classWork={classWork}
            open={openEdit}
            onSubmit={handleonSubmit}
            setOpen={setopenEdit}
          />{" "}
        </>
      )}
    </div>
  );
}

export default SBA;
