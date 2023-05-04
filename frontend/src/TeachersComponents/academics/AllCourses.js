import React, { useState, useEffect } from "react";
import ClassCard from "../../components/courses/ClassCard";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import axios from "../../store/axios";

function AllCourses() {
  const [courses, setcourses] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get(`/courses/teacher/${user?.id}`).then((res) => {
      console.log(res);
      if (res.data.success) {
        //let classesArr = []
        let classes = res.data?.docs.map((e) => {
          let classesArr = [];
          e.classes.map((i) => {
            if (i.teacher === user?.id) {
              classesArr.push({
                class: i.class,
                teacher: i.teacher,
                course: e.code,
              });
            }
          });
          return classesArr;
        });
        console.log(classes.flat());
        setcourses(classes.flat());
      }
    });
  }, [user]);

  return (
    <div>
      <h3>My Tutorial Courses</h3>
      <div className="row mt-5">
        {courses?.length > 0 ? (
          courses?.map((e, i) => (
            <ClassCard key={i} id={e.course} classID={e.class} />
          ))
        ) : (
          <ClassCard />
        )}
      </div>
    </div>
  );
}

export default AllCourses;
