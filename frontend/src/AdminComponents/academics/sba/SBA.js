import React, { useState } from "react";
import Search from "./Search";
import SBATable from "./SbaTable";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";
import Edit from "./EditModal";
import SetPercentage from "./SetPercentageModel";

function SBA() {
  const [data, setdata] = useState([]);
  const [students, setstudents] = useState([]);
  const [examMark, setexamMark] = useState("");
  const [classWorkMark, setclassWorkMark] = useState("");
  const [exam, setexam] = useState("");
  const [classWork, setclassWork] = useState("");
  const [position, setposition] = useState("");
  const [openEdit, setopenEdit] = useState(false);
  const [term, setterm] = useState("");
  const [classID, setclassID] = useState("");
  const [course, setcourse] = useState("");
  const [year, setyear] = useState("");
  const [isSet, setisSet] = useState(false);
  const [selectedUser, setselectedUser] = useState({});
  const [loadingClass, setloadingClass] = useState(false);
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [examPercentage, setexamPercentage] = useState("");
  const [openPercentage, setopenPercentage] = useState(false);
  const [classWorkPercentage, setclassWorkPercentage] = useState("");

  //setpercentage
  const [newexamPercentage, setnewexamPercentage] = useState("");
  const [newclassWorkPercentage, setnewclassWorkPercentage] = useState("");

  const handleSearch = async (e) => {
    setisSet(false);
    setstudents([]);
    setexamMark("");
    setposition("");
    setclassWorkMark("");
    e.preventDefault();
    if (classID === "" || term === "" || course === "" || year === "") {
      return errorAlert("Please select all fields");
    }
    setloadingClass(true);
    await axios.get(`/classes/classCode/${classID}`).then(async (res) => {
      if (!res.data.docs?.sba || res.data.docs?.sba === false) {
        setloadingClass(false);
        return errorAlert("SBA not set for this class");
      }
      setisSet(true);
      await axios
        .get(`/sba/${classID}/${course}/${year}/${term}`)
        .then((result) => {
          setloadingClass(false);
          let data = result.data.docs;
          setdata(data);
          setclassWorkMark(data?.classWork);
          setexamMark(data?.exam);
          setexamPercentage(data?.examPercentage);
          setclassWorkPercentage(data?.classWorkPercentage);
          let sortedStudents = data?.students.sort((a, b) => {
            return Number(b?.total || 0) - Number(a?.total || 0);
          });
          //setstudents(data?.students);
          setstudents(sortedStudents);
        });
    });
  };

  const calculatePositions = (arr) => {
    let sortedStudents = arr.sort((a, b) => {
      return Number(b?.total || 0) - Number(a?.total || 0);
    });

    let results = sortedStudents.map((e, i) => {
      return {
        ...e,
        position: i + 1,
      };
    });
    return results;
  };

  const handleEdit = (id) => {
    if (!classWorkMark) {
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

  const getClassWorkPercentage = (mark) => {
    if (mark) {
      let dec =
        (Number(mark) / Number(classWorkMark)) *
        (Number(classWorkPercentage) / 100);
      return Number(dec * 100).toFixed(0);
    }
    return null;
  };

  const getexamPercentage = (mark) => {
    if (mark) {
      let dec =
        (Number(mark) / Number(examMark)) * (Number(examPercentage) / 100);
      return Number(dec * 100).toFixed(0);
    }
    return null;
  };

  const getTotal = (ex, cla) => {
    let exammark = getexamPercentage(ex);
    let classmark = getClassWorkPercentage(cla);
    return Number(exammark) + Number(classmark);
  };

  const handleonSubmit = async () => {
    setloadingSubmit(true);
    let newData = students.map((i) =>
      i.userID === selectedUser.userID
        ? {
            classWork,
            exam,
            classWorkPercentage: getClassWorkPercentage(classWork),
            examPercentage: getexamPercentage(exam),
            total: getTotal(exam, classWork),
            userID: selectedUser?.userID,
            name: selectedUser?.name,
          }
        : i
    );

    let newStudents = calculatePositions(newData);

    await axios
      .put(`/sba/update/${data?._id}`, { students: newStudents })
      .then((res) => {
        console.log(res.data);
        setopenEdit(false);
        setloadingSubmit(false);
        setstudents(newStudents);
      });
  };

  const handleSetclasswork = (e) => {
    axios
      .put(`/sba/update/${data?._id}`, {
        classWork: e,
      })
      .then(() => setclassWorkMark(e));
  };

  const handleSetclassworkPercentage = (e) => {
    setnewexamPercentage(100 - e);
    setnewclassWorkPercentage(e);
  };

  const handleSetexamPercentage = (e) => {
    setnewexamPercentage(e);
    setnewclassWorkPercentage(100 - e);
  };

  const handleSetexam = (e) => {
    console.log("click");
    axios
      .put(`/sba/update/${data?._id}`, {
        exam: e,
      })
      .then(() => setexamMark(e));
  };

  const handleOpenPercentage = () => {
    setopenPercentage(true);
    setnewclassWorkPercentage(classWorkPercentage);
    setnewexamPercentage(examPercentage);
  };

  const handleSubmitPercentage = () => {
    axios
      .put(`/sba/update/${data?._id}`, {
        examPercentage: newexamPercentage,
        classWorkPercentage: newclassWorkPercentage,
      })
      .then(() => {
        setexamPercentage(newexamPercentage);
        setclassWorkPercentage(newclassWorkPercentage);
        setopenPercentage(false);
      });
  };

  return (
    <div>
      <h3>S.B.A</h3>
      <div className="mb-3">
        <Search
          academicYear={year}
          setacademicYear={setyear}
          setterm={setterm}
          term={term}
          course={course}
          setcourse={setcourse}
          classID={classID}
          setclass={setclassID}
          loading={loadingClass}
          handleSearch={handleSearch}
        />
      </div>
      {isSet && (
        <SBATable
          setclassWork={setclassWork}
          rows={students}
          examMark={examMark}
          setexamMark={handleSetexam}
          classworkMark={classWorkMark}
          setclassworkMark={handleSetclasswork}
          handleEdit={handleEdit}
          examPercentage={examPercentage}
          classWorkPercentage={classWorkPercentage}
          handleOpenPercentage={handleOpenPercentage}
        />
      )}

      <Edit
        name={selectedUser?.name}
        userID={selectedUser?.userID}
        exam={exam}
        examMark={examMark}
        classworkMark={classWorkMark}
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
      />
      <SetPercentage
        open={openPercentage}
        classID={classID}
        setOpen={setopenPercentage}
        examPercentage={newexamPercentage}
        setexamPercentage={handleSetexamPercentage}
        classWorkPercentage={newclassWorkPercentage}
        setclassWorkPercentage={handleSetclassworkPercentage}
        onSubmit={handleSubmitPercentage}
      />
    </div>
  );
}

export default SBA;
