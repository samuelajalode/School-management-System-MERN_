import React, { useState } from "react";
import AddForm from "./NoteForm";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";

function AddNote() {
  const [classID, setclassID] = useState("");
  const [subject, setsubject] = useState("");
  const [topic, settopic] = useState("");
  const [notes, setnotes] = useState("");
  const [file, setfile] = useState("");
  const user = useSelector(selectUser);
  const [loading, setloading] = useState(false);

  const handleAddNote = async () => {
    if (!classID) {
      return errorAlert("Please select class");
    }
    if (!subject) {
      return errorAlert("Please select course");
    }
    if (!file) {
      return errorAlert("Please select file");
    }
    setloading(true);
    const data = await axios.post("/upload", { dataUrl: file });
    if (data.data.error) {
      return errorAlert("The file is too big");
    }
    const path = data.data.url;
    console.log(path);
    await axios
      .post("/notes/create", {
        topic,
        classID,
        courseID: subject,
        notes,
        file: path,
        senderID: user?.id,
      })
      .then((response) => {
        console.log(response.data);
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

  const handleSetFile = async (e) => {
    const selected = e.target.files[0]; //await imageCompression(e.target.files[0], options);
    if (selected?.size > 2000000) {
      return errorAlert("image is too large");
    }
    //setfile(selected);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(selected);
    fileReader.onloadend = () => {
      setfile(fileReader.result);
    };
  };
  const handleResetNote = () => {
    setclassID("");
    setsubject("");
    settopic("");
    setnotes("");
    setfile("");
  };

  return (
    <>
      <div className="content__container mb-5">
        <h3>Add Notes File</h3>
        <AddForm
          classID={classID}
          setclass={setclassID}
          subject={subject}
          setsubject={setsubject}
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
