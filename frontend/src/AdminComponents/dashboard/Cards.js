import React, { useState, useEffect } from "react";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Card from "../../components/dashboard/Card";
import ClassIcon from "@material-ui/icons/Class";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";

function Cards({ counts }) {
  const [students, setstudents] = useState(0);
  const [staff, setstaff] = useState(0);
  const [classes, setclasses] = useState(0);
  const [campuses, setcampuses] = useState(0);
  const [course, setcourse] = useState(0);
  const [divisions, setdivisions] = useState(0);

  useEffect(() => {
    setstudents(counts?.students);
    setstaff(counts?.staff);
    setclasses(counts?.classes);
    setcourse(counts?.courses);
    setcampuses(counts?.campuses);
    setdivisions(counts?.divisions);
  }, [counts]);

  return (
    <div className="row">
      <Card
        icon={<PeopleAltIcon />}
        value={students}
        title="Students"
        link="/students"
      />
      <Card
        icon={<PeopleAltIcon />}
        value={staff}
        title="Staff"
        link="/staff"
      />
      <Card
        icon={<ClassIcon />}
        value={classes}
        title="Classes"
        message="Registered Classes"
        link="/academics/classes"
      />
      <Card
        icon={<BrandingWatermarkIcon />}
        value={divisions}
        title="Divisions"
        message="Registered "
        link="/academics/divisions"
      />
      <Card
        icon={<HomeWorkIcon />}
        value={campuses}
        title="Campuses"
        message="Registered Campuses"
        link="/students/campus"
      />
      <Card
        icon={<ImportContactsIcon />}
        value={course}
        title="Courses"
        message="Registered"
        link="/academics/courses"
      />
    </div>
  );
}

export default Cards;
