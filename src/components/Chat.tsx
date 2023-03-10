import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "./chatContainer/ChatContainer";
import Contacts from "./contacts/Contacts";
import Welcome from "./welcome/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef<any>();
  const [contacts, setContacts] = useState<any>([]);
  const [currentChat, setCurrentChat] = useState<any>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(undefined);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("userInfo") as string));
    }
  }, []);

  // useEffect(() => {
  //   if (currentUser) {
  //     socket.current = io(host);
  //     socket.current.emit("add-user", currentUser._id);
  //   }
  // }, [currentUser]);

  const getAllUsers = () => {
    axios.get(`${allUsersRoute}/${currentUser._id}`).then((res: any) => {
      setContacts(res?.data);
    });
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
      if (currentUser.isAvatarImageSet) {
        getAllUsers();
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
