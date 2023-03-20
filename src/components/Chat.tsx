import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { host } from "../utils/APIRoutes";
import ChatContainer from "./chatContainer/ChatContainer";
import Contacts from "./contacts/Contacts";
import Welcome from "./welcome/Welcome";
import { State, User } from "../models/interfaces";
import { getAllUsers } from "../services/userService";

export default function Chat() {
  const [messageCount, setMessageCount] = useState(0);
  const navigate = useNavigate();
  const socket = useRef<Socket>();

  const [state, setState] = useState<State>({
    contacts: [],
    currentChat: undefined,
    currentUser: undefined,
  });

  useEffect(() => {
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

  const getSavedUsers = async () => {
    const { data } = await getAllUsers(state?.currentUser?._id) as {
      data: any;
    };
    setState((prev) => ({ ...prev, contacts: data }));
  };

  useEffect(() => {
    if (state?.currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", state.currentUser._id);
      if (!state.currentUser.isAvatarImageSet) {
        navigate("/setAvatar");
        return;
      }
      getSavedUsers();
    }
  }, [state.currentUser]);

  const handleChatChange = (chat: any) => {
    setState((prev) => ({ ...prev, currentChat: chat }));
  };

  const memoizedContacts = useMemo(() => state.contacts, [state.contacts]);

  return (
    <>
      <div className="h-full w-full flex flex-col justify-center gap-1 items-center chatBg">
        <div className="chatMainWrapper">
          <Contacts contacts={memoizedContacts} changeChat={handleChatChange} />

          {!state.currentChat ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={state.currentChat} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
}
