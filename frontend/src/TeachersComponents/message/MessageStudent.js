import React, { useState } from "react";
import SendForm from "../../components/messages/SendToForm";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import { useSelector } from "react-redux";
import { selectClasses } from "../../store/slices/schoolSlice";
import { selectUser } from "../../store/slices/userSlice";

function MessageStudent() {
  const [message, setmessage] = useState("");
  const [recipient, setrecipient] = useState("");
  const [recipientOptions, setrecipientsOptions] = useState([]);
  const sender = useSelector(selectUser);
  const classes = useSelector(selectClasses);
  const [search, setsearch] = useState("");

  const handleSearchbyName = (e) => {
    e.preventDefault();
    axios.get(`/students/search/${search}`).then((res) => {
      if (res.data.error) {
        console.log("error");
        errorAlert(res.data.error);
        return 0;
      }
      if (res.data.users.length <= 0) {
        return errorAlert("No students Find");
      }
      setsearch("");
      setrecipientsOptions(
        res.data.users.map((user) => {
          return {
            id: user.userID,
            name: user.name,
            surname: user.surname,
          };
        })
      );
      console.log(recipientOptions);
    });
  };

  const handleSearchbyClass = (e) => {
    axios.get(`/students/class/${e}`).then((res) => {
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
            surname: user.surname,
          };
        })
      );
    });
  };

  const onSend = (e) => {
    e.preventDefault();
    if (message && recipient) {
      axios
        .post(`/chats/user`, {
          message,
          sender: sender?.id,
          userID: recipient,
        })
        .then((res) => {
          if (res.data.error) {
            errorAlert(res.data.error);
            return 0;
          }
          successAlert("message send");
          setmessage("");
        });
    }
  };

  const searchOptions = () => {
    return recipientOptions.map((e) => (
      <option key={e.id} value={e.id}>
        {e.id} - {e.name} {e.surname}
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
      <SendForm
        message={message}
        setmessage={setmessage}
        onSend={onSend}
        recipientsOptions={recipientOptions}
        recipient={recipient}
        searchOptions={searchOptions}
        sendto="Students"
        setrecipient={setrecipient}
        sender={sender?.id}
      />
    </div>
  );
}

export default MessageStudent;
