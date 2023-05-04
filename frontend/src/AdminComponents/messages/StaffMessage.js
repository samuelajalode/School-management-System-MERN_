import React, { useState, useEffect } from "react";
import SendToForm from "../../components/messages/SendToForm";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

function StaffMessage() {
  const [message, setmessage] = useState("");
  const [recipientsOptions, setrecipientsOptions] = useState([]);
  const [recipient, setrecipient] = useState("");
  const sender = useSelector(selectUser);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  useEffect(() => {
    axios.get("/teachers").then((res) => {
      setrecipientsOptions(
        res.data.map((user) => {
          return {
            id: user.userID,
            name: user.name,
            telephone: user?.telephone || user?.mobilenumber,
            surname: user.surname,
          };
        })
      );
    });
  }, []);

  const onSend = (e) => {
    e.preventDefault();
    seterror("");
    if (!recipient) {
      seterror("Please select recipient");
    }

    if (message && recipient) {
      setloading(true);
      let selectedStudent = recipientsOptions.find((i) => i.id === recipient);
      axios
        .post(`/chats`, {
          message,
          telephone: selectedStudent?.telephone,
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

  const searchOptions = () => {
    return recipientsOptions.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name} {option.surname} {option.id}{" "}
      </option>
    ));
  };

  return (
    <div>
      <SendToForm
        message={message}
        setmessage={setmessage}
        onSend={onSend}
        loading={loading}
        recipientsOptions={recipientsOptions}
        recipient={recipient}
        setrecipient={setrecipient}
        sender={sender?.id}
        searchOptions={searchOptions}
        sendto="Staff"
        error={error}
      />
    </div>
  );
}

export default StaffMessage;
