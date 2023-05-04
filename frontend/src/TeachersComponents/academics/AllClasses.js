import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import { useSelector } from "react-redux";
import ClassCard from "./ClassCard";
import { selectUser } from "../../store/slices/userSlice";

function AllClasses() {
  const user = useSelector(selectUser);
  const [classes, setclasses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let classesData = await axios.get(`/classes/teacher/${user?.userID}`);
      setclasses(classesData.data.docs);
    };
    getData();
  }, [user]);

  return (
    <div>
      <div className="row mt-5">
        {classes?.length > 0 ? (
          classes?.map((e) => <ClassCard key={e._id} id={e.classCode} />)
        ) : (
          <ClassCard />
        )}
      </div>
    </div>
  );
}

export default AllClasses;
