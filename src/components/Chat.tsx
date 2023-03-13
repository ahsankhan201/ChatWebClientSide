import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "./chatContainer/ChatContainer";
import Contacts from "./contacts/Contacts";
import Welcome from "./welcome/Welcome";
import { State, User } from "../models/interfaces";

export default function Chat() {
  
  const navigate = useNavigate();
  const socket = useRef<Socket>();

  const [state, setState] = useState<State>({
    contacts: [],
    currentChat: undefined,
    currentUser: undefined,
  });

  useEffect(() => {
    console.log("socket effect")
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
      return;
    }
    setState((prev) => ({
      ...prev,
      currentUser: JSON.parse(userInfo) as User,
    }));
  }, []);

  const getAllUsers = () => {
    axios.get(`${allUsersRoute}/${state.currentUser?._id}`).then((res: any) => {
      setState((prev) => ({ ...prev, contacts: res?.data }));
    });
  };



  useEffect(() => {
    console.log("socket effect", socket.current)
    if (state?.currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", state.currentUser._id);
      if (state.currentUser.isAvatarImageSet) {
        getAllUsers();
      } else {
        navigate("/setAvatar");
      }
    }
  }, [state.currentUser]);

  const handleChatChange = (chat: any) => {
    setState((prev) => ({ ...prev, currentChat: chat }));
    console.log("chat", chat);
  };

  const memoizedContacts = useMemo(() => state.contacts, [state.contacts]);
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={memoizedContacts} changeChat={handleChatChange} />
          {state.currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={state.currentChat} socket={socket} />
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















  // const setUserSocketId = async (id: any) => {
  //   console.log("id", id.id);
  //   // await axios.put(
  //   //   `${setSocketRoute}/${state.currentUser?._id}`,
  //   //   { setSocketId: id.id } // Send setSocketId in the request body
  //   // );
  // };