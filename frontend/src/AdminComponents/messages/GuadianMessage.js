import React, { useState } from "react";
import SendToForm from "../../components/messages/SendToForm";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { debounce } from "throttle-debounce";

function GuadianMessage() {
  const [message, setmessage] = useState("");
  const [recipientsOptions, setrecipientsOptions] = useState([]);
  const [recipient, setrecipient] = useState("");
  const sender = useSelector(selectUser);
  const [studentsList, setstudentsList] = useState([]);
  const [search, setsearch] = useState("");
  const [sendto, setsendto] = useState("Guadian");

  const autocompleteSearch = () => {
    if (search) {
      axios.get(`/students/search/${search}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setstudentsList(
          res.data.users.map((user) => {
            return {
              _id: user._id,
              userID: user.userID,
              name: user.name,
              surname: user.surname,
            };
          })
        );
      });
    }
  };

  const autocompleteSearchDebounced = debounce(500, autocompleteSearch);

  const onSend = (e) => {
    e.preventDefault();
    if (message && recipient) {
      let selected = recipientsOptions.find((i) => i.id === recipient);
      if (!selected?.mobile) {
        return errorAlert("Parent does not have phone number");
      }

      axios
        .post(`/chats`, {
          message,
          userID: recipient,
          telephone: selected?.mobile,
          sender: sender?.id,
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

  const handleSearchbyName = (e) => {
    e.preventDefault();
    autocompleteSearch();
  };

  const handleChange = (e) => {
    setsearch(e.target.value);
    autocompleteSearchDebounced(e.target.value);
  };

  const handleSearchParents = (id) => {
    axios.get(`/students/parents/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.error) {
        errorAlert(res.data.error);
        return 0;
      }
      setrecipientsOptions(res.data.docs);
    });
  };

  const searchOptions = () => {
    return recipientsOptions.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name} {option.surname} {option.relationship}{" "}
      </option>
    ));
  };

  return (
    <div>
      <div className="mb-5 content__container row">
        <form onSubmit={handleSearchbyName} className="mb-5 col-12 ">
          <label className="form-label">Search for Student by Name or ID</label>
          <div className="d-flex flex-row">
            <input
              value={search}
              onChange={handleChange}
              className="form-control"
              type="text"
              placeholder="Type here..."
            />
            <button className="btn blue__btn">Search</button>
          </div>
          <ul className="students__container">
            {studentsList.length > 0 ? (
              <>
                {studentsList.map((option) => (
                  <li
                    onClick={() => handleSearchParents(option._id)}
                    key={option._id}
                    className="option"
                  >
                    {option.name} {option.surname} {option.userID}{" "}
                  </li>
                ))}
              </>
            ) : (
              <li>No results found</li>
            )}
          </ul>
        </form>
      </div>
      {recipientsOptions.length > 0 && (
        <SendToForm
          message={message}
          setmessage={setmessage}
          onSend={onSend}
          searchOptions={searchOptions}
          recipient={recipient}
          setrecipient={setrecipient}
          sender={sender?.id}
          sendto={sendto}
        />
      )}
    </div>
  );
}

export default GuadianMessage;
