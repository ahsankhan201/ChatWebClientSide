import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "../logout/Logout";
import BasicModal from "../../utils/PopUpModel";
import ChatMessages from "./ChatMessages";
import {
  addFileUpload,
  recieveAllMessages,
  sendMessages,
} from "../../services/userMessageService";

interface Props {
  currentChat: any;
  socket: any;
}

function ChatContainer({ currentChat, socket }: Props) {
  const [messages, setMessages] = useState<any>([]);
  const scrollRef = useRef<any>();
  const [arrivalMessage, setArrivalMessage] = useState<any>([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [userImage, setUserImage] = useState<string>("");

  const callContainer = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") ?? "");
    const { data } = (await recieveAllMessages(
      userInfo._id,
      currentChat._id
    )) as { data: any };
    setMessages(data);
  };

  const avatarImage = useMemo(() => {
    return `data:image/svg+xml;base64,${currentChat.avatarImage}`;
  }, [currentChat.avatarImage]);

  useEffect(() => {
    callContainer();
    if (arrivalMessage) {
      setMessages((prev: any) => [...prev, arrivalMessage]);
    }
  }, [currentChat, arrivalMessage]);

  const handleSendMsg = useCallback(
    async (msg: any, file: any) => {
      const { _id } = await JSON.parse(
        localStorage.getItem("userInfo") as string
      );
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file[0]);
          formData.append("from", _id);
          formData.append("to", currentChat._id);
          formData.append("message", msg);

          const { data } = await addFileUpload(formData) as { data: any };
          if (data) {
            socket.current.emit("send-msg", {
              to: currentChat._id,
              from: _id,
              msg,
              image: data,
            });
            setMessages([
              ...messages,
              { fromSelf: true, image: data.image, message: data.message },
            ]);
          }
        } catch (error) {
          console.error("Upload failed: ", error);
        }
      } else {
        socket.current.emit("send-msg", {
          to: currentChat._id,
          from: _id,
          msg,
          image: null,
        });
        const data = (await sendMessages(_id, currentChat._id, msg, null)) as {
          data: any;
        };
        if (data) {
          setMessages([
            ...messages,
            { fromSelf: true, message: msg, image: null },
          ]);
        }
      }
    },
    [messages, socket, currentChat._id]
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: any) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg ? msg?.msg : null,
          image: msg?.image ? msg?.image.image : null,
        });
      });
    }
  }, [socket, messages, arrivalMessage]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev: any) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  const openModel = (userImage: string): any => {
    setUserImage(userImage);
    setModelOpen(!modelOpen);
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={avatarImage} alt="" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <ChatMessages
        scrollRef={scrollRef}
        messages={messages}
        openModel={openModel}
      />
      <ChatInput handleSendMsg={handleSendMsg} />
      {modelOpen && (
        <BasicModal
          modelOpen={modelOpen}
          setModelOpen={setModelOpen}
          userImage={userImage}
        />
      )}
    </Container>
  );
}

export default React.memo(ChatContainer);






















const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;

  padding-bottom: 1rem;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    background-color: #ad39f7;
    align-items: center;
    padding: 1rem 1rem;
    .user-details {
      paddingtop: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #000;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #edf5f9;
        font-size: 1.1rem;
        color: black;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #7e3ce4;
        font-size: 1.1rem;
        color: black;
      }
    }
  }
`;
