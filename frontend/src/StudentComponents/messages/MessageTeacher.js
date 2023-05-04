import React, { useState, useEffect } from "react";
import SendForm from "../../components/messages/SendToForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";

function MessageTeacher() {
  const [message, setmessage] = useState("");
  const [recipient, setrecipient] = useState("");
  const [recipientOptions, setrecipientOptions] = useState([]);
  const user = useSelector(selectUser);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    axios.get("/teachers").then((res) => {
      setrecipientOptions(
        res.data.map((e) => {
          return {
            id: e.userID,
            name: e.name,
            surname: e.surname,
          };
        })
      );
    });
  }, []);

  const onSend = (e) => {
    e.preventDefault();
    if (message && recipient) {
      setloading(true);
      axios
        .post(`/chats/user`, {
          message,
          senderID: user?.userID,
          userID: recipient,
        })
        .then((res) => {
          setloading(false);
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
    return recipientOptions.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name} {option.surname} {option.id}{" "}
      </option>
    ));
  };

  return (
    <div>
      <SendForm
        message={message}
        setmessage={setmessage}
        onSend={onSend}
        recipientsOptions={recipientOptions}
        recipient={recipient}
        sendto="Teacher"
        loading={loading}
        searchOptions={searchOptions}
        setrecipient={setrecipient}
        sender={user?.userID}
      />
    </div>
  );
}

export default MessageTeacher;
