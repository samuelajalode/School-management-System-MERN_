import React from "react";
import { useParams } from "react-router-dom";
import ClassDetails from "../../components/class/ClassDetails";

function AllClasses() {
  const { id } = useParams();

  return (
    <div>
      {id ? (
        <ClassDetails id={id} />
      ) : (
        <div className="content__container text-center">
          No Class Details yet{" "}
        </div>
      )}
    </div>
  );
}

export default AllClasses;
