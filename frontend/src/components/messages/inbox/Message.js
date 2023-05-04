import React from 'react'
import {timeStamp} from '../../../utils'

function Message({message, currentUser}) {
    return (
        <div className={currentUser === message?.senderID? "sender__mesaage message" : "message"}>
            <div className="message__content">
               {message?.message}
            </div>
            <div className="message__time ">{timeStamp(message.date)}</div>
        </div>
    )
}

export default Message
