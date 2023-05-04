import React, { useState } from "react";
import SendToForm from "../../components/messages/SendToForm";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import { useSelector } from "react-redux";
import { selectClasses } from "../../store/slices/schoolSlice";
import { selectUser } from "../../store/slices/userSlice";

function StudentMessage() {
  const [message, setmessage] = useState("");
  const [recipientsOptions, setrecipientsOptions] = useState([]);
  const [recipient, setrecipient] = useState("");
  const [search, setsearch] = useState("");
  const classes = useSelector(selectClasses);
  const sender = useSelector(selectUser);
  const [loading, setloading] = useState("");

  const onSend = (e) => {
    e.preventDefault();
    if (message && recipient) {
      setloading(true);
      let selected = recipientsOptions.find((i) => i.id === recipient);
      if (!selected?.telephone) {
        setloading(false);
        return errorAlert("Student does not have phone number");
      }
      console.log(selected);
      axios
        .post(`/chats`, {
          message,
          telephone: selected?.telephone,
          userID: recipient,
          sender: sender?.id,
        })
        .then((res) => {
          setloading(false);
          if (res.data.error) {
            errorAlert(res.data.error);
            return 0;
          }
          successAlert("message send");
          setmessage("");
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
  };

  const handleSearchbyName = (e) => {
    e.preventDefault();
    axios.get(`/students/search/${search}`).then((res) => {
      console.log(res.data);
      if (res.data.error) {
        console.log("error");
        errorAlert(res.data.error);
        return 0;
      }
      setrecipientsOptions(
        res.data.users.map((user) => {
          return {
            id: user.userID,
            name: user.name,
            telephone: user?.mobilenumber || user?.telephone,
            surname: user.surname,
          };
        })
      );
    });
  };

  const handleSearchbyClass = (e) => {
    console.log(e);
    axios.get(`/students/class/${e}`).then((res) => {
      console.log(res.data);
      if (res.data.error) {
        console.log("error");
        return errorAlert(res.data.error);
      }
      setrecipientsOptions(
        res.data.users.map((user) => {
          return {
            id: user.userID,
            name: user.name,
            telephone: user?.telephone || user?.mobilenumber,
            surname: user.surname,
          };
        })
      );
    });
  };

  const searchOptions = () => {
    return recipientsOptions.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name} {option.surname} {option.id}{" "}
      </option>
    ));
  };

  return (
    <div>
      <div className="mb-5 content__container row">
        <h3>Select Student </h3>
        <form action="" onSubmit={handleSearchbyName} className="mb-5 col-md-6">
          <label className="form-label">
            Search Student by Name or Student ID
          </label>
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="form-control"
            type="text"
            placeholder="Type here..."
          />
        </form>
        <div className="col-md-5">
          <label className="form-label">OR Select Student's Class</label>
          <select
            onChange={(e) => handleSearchbyClass(e.target.value)}
            id="inputState"
            className="form-select"
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {classes.map((e) => (
              <option key={e._id} value={e.classCode}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {recipientsOptions.length > 0 && (
        <SendToForm
          message={message}
          setmessage={setmessage}
          onSend={onSend}
          recipientsOptions={recipientsOptions}
          recipient={recipient}
          setrecipient={setrecipient}
          sender={sender?.id}
          loading={loading}
          searchOptions={searchOptions}
          sendto="Student"
        />
      )}
    </div>
  );
}

export default StudentMessage;
