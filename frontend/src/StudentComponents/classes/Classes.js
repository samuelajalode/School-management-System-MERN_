import React, { useEffect, useState } from "react";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import axios from "../../store/axios";
import Loading from "../../Loading";
import ClassDetails from "../../components/class/ClassDetails";

function Classes() {
  const user = useSelector(selectUser);
  const [classID, setclassID] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setloading(true);
      let student = await axios.get(`/user/${user?.userID}`);

      let classData = student?.data?.user;
      console.log(classData?.classID);
      setclassID(classData?.classID);
      setloading(false);
    };
    getData();
  }, [user]);

  return (
    <div>
      {loading && <Loading />}
      <div className="content__container">
        {classID ? (
          <ClassDetails id={classID} />
        ) : (
          <div>No Class Details yet </div>
        )}
      </div>
    </div>
  );
}

export default Classes;
