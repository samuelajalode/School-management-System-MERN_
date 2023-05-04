import React, { useState } from "react";
import SendForm from "../../components/messages/SendToForm";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

function BulkMessage() {
  const [message, setmessage] = useState("");
  const [recipient, setrecipient] = useState("");
  const sender = useSelector(selectUser);
  const [loading, setloading] = useState(false);

  const recipientsOptions = [
    { id: "students", name: "All Students" },
    { id: "parents", name: "All Parents" },
    { id: "staff", name: "All Staff" },
  ];

  // sender: sender?.id,

  const searchOptions = () => {
    return recipientsOptions.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ));
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (message && recipient) {
      setloading(true);
      switch (recipient) {
        case "staff":
          return await axios.get("/teachers").then((res) => {
            let staff = res.data;
            staff.map(
              async (i) =>
                await axios
                  .post(`/chats`, {
                    message,
                    telephone: i.telephone || i?.mobilenumber,
                    senderID: sender?.id,
                    userID: i?.userID,
                  })
                  .then((response) => {
                    setloading(false);
                    if (response.data.error) {
                      errorAlert(response.data.error);
                      return 0;
                    }
                    successAlert("message send to all staff members");
                    setmessage("");
                  })
                  .catch((err) => {
                    setloading(false);
                    console.log(err);
                  })
            );
          });
        case "students":
          return await axios.get("/students").then((res) => {
            let students = res.data;
            students.map(
              async (re) =>
                await axios
                  .post(`/chats`, {
                    message,
                    userID: re?.userID,
                    telephone: re.telephone || re?.mobilenumber,
                    senderID: sender?.id,
                  })
                  .then((response) => {
                    setloading(false);
                    if (response.data.error) {
                      errorAlert(response.data.error);
                      return 0;
                    }
                    successAlert("message send to all students");
                    setmessage("");
                  })
                  .catch((err) => {
                    setloading(false);
                    console.log(err);
                  })
            );
          });
        case "parents":
          return await axios.get("/students/parents").then((res) => {
            let parents = res.data.docs;
            console.log(parents);
            // eslint-disable-next-line no-lone-blocks
            {
              parents.length > 0
                ? parents.map(
                    async (i) =>
                      await axios
                        .post(`/chats`, {
                          message,
                          parent: i._id,
                          userID: "parent",
                          telephone: i?.mobile,
                          sender: sender?.id,
                        })
                        .then((response) => {
                          setloading(false);
                          if (response.data.error) {
                            errorAlert(response.data.error);
                            return 0;
                          }
                          successAlert("message send to all parents");
                          setmessage("");
                        })
                        .catch((err) => {
                          setloading(false);
                          console.log(err);
                        })
                  )
                : errorAlert("There are parents data");
              setloading(false);
            }
          });
        default:
          break;
      }
    }
  };

  return (
    <div>
      <SendForm
        message={message}
        setmessage={setmessage}
        onSend={handleSend}
        recipientsOptions={recipientsOptions}
        recipient={recipient}
        setrecipient={setrecipient}
        sender={sender?.id}
        loading={loading}
        searchOptions={searchOptions}
        sendto="All"
      />
    </div>
  );
}

export default BulkMessage;
