import React, { useState } from "react";
import SendForm from "../../components/messages/SendToForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";

function MessageAdmin() {
  const [message, setmessage] = useState("");
  const [recipient, setrecipient] = useState("admin");
  const user = useSelector(selectUser);
  const [loading, setloading] = useState(false);

  const recipientOptions = [
    {
      id: "admin",
      name: "admin",
    },
  ];

  const onSend = (e) => {
    e.preventDefault();
    if (message && recipient) {
      setloading(true);
      axios
        .post(`/chats/user`, {
          message,
          sender: user?.id,
          userID: recipient,
          telephone: "",
        })
        .then((res) => {
          console.log(res);
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
    return recipientOptions.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ));
  };

  return (
    <div>
      <SendForm
        message={message}
        setmessage={setmessage}
        onSend={onSend}
        loading={loading}
        recipient={recipient}
        searchOptions={searchOptions}
        sendto="School Admin"
        setrecipient={setrecipient}
        sender={user?.id}
      />
    </div>
  );
}

export default MessageAdmin;
