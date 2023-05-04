import React from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "../../components/messages/inbox/Sidebar";
import Message from "../../components/messages/inbox/MessageContainer";
import DefaultView from "../../components/messages/inbox/DefaultView";

function Messaging() {
  return (
    <div>
      <div className=" messages__container ">
        <Sidebar />
        <div className="containing__chat">
          <Switch>
            <Route component={Message} path="/messages/chat/:id" />
            <Route component={DefaultView} path="/messages/chat" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Messaging;
