import React, { useEffect } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  //CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  // getImgSrc,
  timeStamp,
  getTrimString,
  getCapitalize,
  //getIntial,
} from "../utils";
import axios from "../store/axios";
import { selectUser } from "../store/slices/userSlice";
import {
  selectNotifications,
  setNotifications,
} from "../store/slices/schoolSlice";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router";

const TheHeaderDropdownMssg = () => {
  const user = useSelector(selectUser);
  const messages = useSelector(selectNotifications);
  // const [messages, setmessages] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    axios.get(`/chats/user/notifications/${user?.id}`).then((res) => {
      let data = res.data;
      console.log(data);
      dispatch(setNotifications(data));
      // setmessages(data);
    });
  }, [user, dispatch]);

  const handleOpenNotification = (id) => {
    let message = messages.find((i) => i._id === id);
    if (message.type === "inbox") {
      axios.put(`/chats/update/view/${user?.id}`).then((res) => {
        let newMessage = messages.filter((i) => i.type !== "inbox");
        dispatch(setNotifications(newMessage));
        history.push("/messages");
      });
    } else {
      axios
        .put(`/chats/update/chat/${message?.channelID}/${user?.id}`)
        .then((res) => {
          let newMessages = messages.filter((i) => i.type !== "chat");
          dispatch(setNotifications(newMessages));
          history.push(`/messages/chat/${message?.channelID}`);
        });
    }
  };

  const itemsCount = messages?.length;
  return (
    <CDropdown inNav className="c-header-nav-item mx-1" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" />
        {itemsCount > 0 && (
          <CBadge shape="pill" color="info">
            {itemsCount}
          </CBadge>
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light">
          <strong>You have {itemsCount} messages</strong>
        </CDropdownItem>

        {messages &&
          messages
            .map((e) => (
              <CDropdownItem
                onClick={() => handleOpenNotification(e._id)}
                key={e?._id}
                //href="/messages"
              >
                <div className="message d-flex">
                  <div className="pt-3 mr-3 float-left">
                    <div className="c-avatar">
                      <Avatar />
                      <span className="c-avatar-status bg-danger"></span>
                    </div>
                  </div>
                  <div>
                    <div className="font-weight-bold text-truncate">
                      {getCapitalize(e?.sender)}
                    </div>
                    <div className="small text-muted text-truncate">
                      {" "}
                      {e?.message && getTrimString(e?.message, 20)}{" "}
                    </div>
                    <small className="text-muted float-right mt-1">
                      {timeStamp(e?.date)}
                    </small>
                  </div>
                </div>
              </CDropdownItem>
            ))
            .slice(0.5)}

        {messages.length > 5 ? (
          <CDropdownItem
            href="/messages/chat"
            className="text-center border-top"
          >
            <strong>View all messages</strong>
          </CDropdownItem>
        ) : (
          <CDropdownItem
            href="/messages/chat"
            className="text-center border-top"
          >
            <strong>View Chat</strong>
          </CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownMssg;
