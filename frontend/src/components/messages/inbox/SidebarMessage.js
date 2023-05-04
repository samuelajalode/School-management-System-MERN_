import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import axios from "../../../store/axios";
import {
  getIntial,
  getImgSrc,
  getCapitalize,
  timeStamp,
  getTrimString,
} from "../../../utils";
import {
  selectNotifications,
  setNotifications,
} from "../../../store/slices/schoolSlice";
import { useSelector, useDispatch } from "react-redux";

function SidebarMessage({ chat, currentUser }) {
  const [user, setuser] = useState({});
  const [lastmessage, setlastmessage] = useState({});
  const messages = useSelector(selectNotifications);
  const dispatch = useDispatch();

  useEffect(() => {
    let userId =
      currentUser === chat?.requestor_id
        ? chat?.acceptor_id
        : chat?.requestor_id;
    axios.get(`/user/${userId.trim()}`).then((res) => {
      let data = res.data.user;
      setuser({
        profileUrl: data?.profileUrl,
        name: data?.name,
        surname: data?.surname,
      });
      setlastmessage(chat?.messages.pop());
    });
  }, [chat, currentUser]);

  const handleOpen = async (id) => {
    await axios.put(`/chats/update/chat/${id}/${currentUser}`).then((res) => {
      console.log(res);
      let newMessages = messages.filter((i) => i.type !== "chat");
      dispatch(setNotifications(newMessages));
    });
  };

  return (
    <div className="sidemessage">
      <Link
        onClick={() => handleOpen(chat?._id)}
        to={`/messages/chat/${chat?._id}`}
        className="d-flex"
      >
        <div className="mr-2">
          <Avatar
            alt={getIntial(user?.name || "O")}
            src={getImgSrc(user?.profileUrl)}
          ></Avatar>
        </div>
        <div>
          <div className="d-flex align-center justify-content-between w-100">
            <h6>
              {getCapitalize(user?.name)}{" "}
              {user?.surname && getTrimString(getCapitalize(user?.surname), 5)}
            </h6>
            <small className="text-muted">{timeStamp(lastmessage?.date)}</small>
          </div>
          <span>
            {getTrimString(lastmessage?.message || "last message...", 20)}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default SidebarMessage;
