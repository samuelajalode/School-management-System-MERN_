import React, { useState } from "react";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import { IconButton } from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Edit from "./EditNotice";

function Notice({
  description,
  createdBy,
  date,
  title,
  createdAt,
  isEdit,
  id,
  open,
  setOpen,
  editData,
  handleDelete,
}) {
  const colors = ["#2ad7c5", "#ffa201", "#f939a1"];

  const handleOpenEdit = () => {
    setOpen(true);
    editData?.setdate(date);
    editData?.settitle(title);
    editData?.setcreatedby(createdBy);
    editData?.setdescription(description);
    editData?.seteditID(id);
  };

  let bgColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="notice d-flex justify-content-between align-items-center">
      <div>
        <h4>
          <strong>{title}</strong>
        </h4>
        <Chip
          style={{ backgroundColor: `${bgColor}` }}
          className="chip__date mb-2"
          label={moment(date).format(" Do MMMM, YYYY")}
        />
        <p>
          <strong> {description} </strong>
        </p>
        <div>
          <h6>
            {createdBy} /{" "}
            <span className="text-muted"> {moment(createdAt).fromNow()}</span>
          </h6>
        </div>
      </div>
      {isEdit && (
        <>
          <div>
            <IconButton onClick={() => handleOpenEdit()}>
              <OpenInNewIcon />
            </IconButton>
          </div>
          <Edit
            editData={editData}
            open={open}
            handleDelete={handleDelete}
            setOpen={setOpen}
          />
        </>
      )}
    </div>
  );
}

export default Notice;
