import React, { useState, useEffect } from "react";
import Message from "./Message";
import { useParams } from "react-router-dom";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { Avatar } from "@material-ui/core";
import { getImgSrc, getCapitalize, getIntial } from "../../../utils";

function MessageContainer() {
  const { id } = useParams();
  const [messages, setmessages] = useState([]);
  const [message, setmessage] = useState("");
  const [user, setuser] = useState({});
  const currentUser = useSelector(selectUser);

  const messagesEndRef = React.createRef();

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    axios.get(`/chats/chat/${id}`).then(async (res) => {
      setmessages(res.data?.messages);
      let userId =
        currentUser?.id === res.data?.requestor_id
          ? res.data?.acceptor_id
          : res.data?.requestor_id;
      await axios.get(`/user/${userId}`).then((response) => {
        setuser(response.data.user);
      });
    });
  }, [id, currentUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      axios
        .put(`/chats/send/${id}`, {
          message,
          senderID: currentUser?.id,
          channelID: id,
        })
        .then((res) => {
          console.log(res.data);
          setmessages(res.data.doc?.messages);
          setmessage("");
        });
    }
  };

  return (
    <div className="message__container">
      <div className="header d-flex">
        <Avatar
          src={getImgSrc(user?.profileUrl)}
          alt={getIntial(user?.name || "U")}
        />
        <div className="ml-3">
          <h6>
            {" "}
            {getCapitalize(user?.name || "A")} {getCapitalize(user?.surname)}
          </h6>
          <span>{user?.userID}</span>
        </div>
      </div>
      <div className="message__messages p-2">
        {messages &&
          messages.map((e) => (
            <Message message={e} key={e._id} currentUser={currentUser?.id} />
          ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="send">
        <input
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          type="text"
          placeholder="Type here ..."
        />
        <button type="submit" className="btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageContainer;
