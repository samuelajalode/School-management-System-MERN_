import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import Table from "../../components/messages/Table";
import PropTypes from "prop-types";
import { errorAlert } from "../../utils";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TelegramIcon from "@material-ui/icons/Telegram";
import Typography from "@material-ui/core/Typography";
import ForumIcon from "@material-ui/icons/Forum";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { timeStamp } from "../../utils";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      color="primary"
      icon={props?.incon}
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const tableHeader = [
  { name: "CreatedAt", id: "createdAt" },
  { name: "Send To", id: "sender" },
  { name: "Message", id: "message" },
];

const tableHeaderReceived = [
  { name: "CreatedAt", id: "createdAt" },
  { name: " Received From", id: "userID" },
  { name: "Message", id: "message" },
];
function Messaging() {
  const user = useSelector(selectUser);
  const [messages, setmessages] = useState([]);
  const [sendMessages, setsendMessages] = useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get(`/chats/send/${user?.id}`).then(async (res) => {
      setmessages(
        res.data.map((e) => {
          return {
            ...e,
            createdAt: timeStamp(e.createdAt),
          };
        })
      );
    });
  }, [user]);

  useEffect(() => {
    axios.get(`/chats/user/${user?.id}`).then(async (res) => {
      setsendMessages(
        res.data.map((e) => {
          return {
            ...e,
            createdAt: timeStamp(e.createdAt),
          };
        })
      );
    });
  }, [user]);

  const handleDeleteAll = () => {
    axios
      .delete("/chats/deleteAll")
      .then((res) => {
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        setmessages([]);
        setsendMessages([]);
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Failed");
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`/chats/delete/${id}`)
      .then((res) => {
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        setmessages(messages.filter((i) => i._id !== id));
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Failed");
      });
  };

  const handleDeleteSend = (id) => {
    console.log(id);
    axios
      .delete(`/chats/delete/${id}`)
      .then((res) => {
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        setmessages(sendMessages.filter((i) => i._id !== id));
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Failed");
      });
  };

  return (
    <div>
      <h3>Inbox Messages</h3>
      <div className="content__container d-flex mb-5 justify-content-between">
        <div className="text-center">
          <h6>
            <strong>Send Messages</strong>
          </h6>
          <strong>{messages.length}</strong>
        </div>
        <div>
          <button onClick={handleDeleteAll} className="btn blue__btn">
            Delete All Messages
          </button>
        </div>
      </div>

      <div className="content__container">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <LinkTab
            icon={<TelegramIcon />}
            label="Send Messages"
            href="/outgoing"
            {...a11yProps(0)}
          />
          <LinkTab
            icon={<ForumIcon />}
            label="Received Messages"
            href="/income"
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Table
            handleDelete={handleDelete}
            data={messages}
            isEdit={true}
            tableHeader={tableHeader}
          ></Table>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Table
            handleDelete={handleDeleteSend}
            data={sendMessages}
            isEdit={true}
            tableHeader={tableHeaderReceived}
          ></Table>
        </TabPanel>
      </div>

      <div></div>
    </div>
  );
}

export default Messaging;
