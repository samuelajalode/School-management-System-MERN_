import React from "react";
import {
  selectClasses,
  selectDormitories,
  selectCampuses,
} from "../../../store/slices/schoolSlice";
import { useSelector } from "react-redux";
import PromotingStudent from "./PromotingStudent";
import PromotingClass from "./PromotingClass";
import PromotingDormitories from "./PromotingDormitories";
import PromotingCampus from "./PromotingCampus";
import PromotingPast from "./PromotingPast";

function Upgrade() {
  const classes = useSelector(selectClasses);
  const dormitories = useSelector(selectDormitories);
  const campuses = useSelector(selectCampuses);

  return (
    <div>
      <h3 className="mb-5">Students Promotions</h3>
      <PromotingPast classes={classes} />
      <PromotingStudent classes={classes} />
      <PromotingClass classes={classes} />
      <PromotingCampus campuses={campuses} />
      <PromotingDormitories dormitories={dormitories} />
    </div>
  );
}

export default Upgrade;
