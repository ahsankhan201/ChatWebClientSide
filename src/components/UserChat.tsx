import React, { useEffect,useState } from "react";
import "./userchat.css";
interface Props {
  messages: any;
}
function UserChat({ messages }: Props) {
    const [name,setName]=useState<any>('');
  useEffect(() => {
    setName(localStorage?.getItem('username'))
  }, [messages]);
  return (
    <div className="chat-container">
      {messages.map((message: any, index: number) => (
        <div
          key={index}
          className={`message ${
            message.name === name ? "user-message" : "other-message"
          }`}
        >
           <p>{message.name}</p>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}

export default UserChat;
