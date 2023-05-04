import React, { useState } from "react";
import AddForm from "../../AdminComponents/academics/notes/NoteForm";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { useParams } from "react-router-dom";

function AddNote() {
  const [topic, settopic] = useState("");
  const [notes, setnotes] = useState("");
  const [file, setfile] = useState("");
  const user = useSelector(selectUser);
  const [loading, setloading] = useState(false);
  const { id, classID } = useParams();

  const handleAddNote = async () => {
    let fileUrl = " ";
    if (!file) {
      return errorAlert("Please select file");
    }
    setloading(true);
    const fileData = new FormData();
    fileData.append("photo", file);
    let data = await axios.post("/upload", fileData, {});
    if (data.error) {
      return errorAlert("The file is too big");
    }
    fileUrl = data?.path;

    await axios
      .post("/notes/create", {
        topic,
        courseID: id,
        classID,
        notes,
        file: fileUrl,
        senderID: user?.id,
      })
      .then((response) => {
        if (response.data.error) {
          errorAlert(response.data.error);
          setloading(false);
          return 0;
        }
        successAlert("notes successfully added");
        setloading(false);
        handleResetNote();
      })

      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("File is too big");
      });
  };

  const handleResetNote = () => {
    settopic("");
    setnotes("");
    setfile("");
  };

  const handleSetFile = (e) => {
    const selected = e.target.files[0];
    if (selected?.size > 2000000) {
      return errorAlert("image is too large");
    }
    setfile(selected);
  };

  return (
    <>
      <div className="content__container mb-5">
        <h3>Add New Notes</h3>
        <AddForm
          topic={topic}
          settopic={settopic}
          file={file}
          loading={loading}
          handleReset={handleResetNote}
          setfile={handleSetFile}
          role={user?.role}
          handleAdd={handleAddNote}
          notes={notes}
          setnotes={setnotes}
        />
      </div>
    </>
  );
}

export default AddNote;
