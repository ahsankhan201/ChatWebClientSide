import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  sendMessageRoute,
  recieveMessageRoute,
  addFileUploadRoute,
} from "../../utils/APIRoutes";
import Logout from "../logout/Logout";
interface Props {
  currentChat: any;
  socket: any;
}

function ChatContainer({ currentChat, socket }: Props) {
  const [messages, setMessages] = useState<any>([]);
  const scrollRef = useRef<any>();
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);

  const callContainer = async () => {
    const data = JSON.parse(localStorage.getItem("userInfo") ?? "");
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  };

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
        // set the formData in the body to convert the file to base64 and send it to the server
        const formData = new FormData();
        formData.append("file", file[0]);
        formData.append("from", _id);
        formData.append("to", currentChat._id);
        fetch(`${addFileUploadRoute}`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response) {
              console.log("response", response);
              return response.json();
            } else {
              throw new Error("Upload failed");
            }
          })
          .then((data) => {
            socket.current.emit(
              "upload",
              {
                to: currentChat._id,
                from: _id,
                image: data,
              },
              setMessages([...messages, { fromSelf: true, image: data.image }]),
              (status: any) => {}
            );
          })
          .catch((error) => {
            console.error("Upload failed: ", error.message);
          });
        return;
      }

      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: _id,
        msg,
      });

      if (msg) {
        await axios.post(sendMessageRoute, {
          from: _id,
          to: currentChat._id,
          message: msg,
        });
        setMessages([...messages, { fromSelf: true, message: msg }]);
      }
    },
    [messages, socket, currentChat._id, arrivalMessage]
  );

  const avatarImage = useMemo(() => {
    return `data:image/svg+xml;base64,${currentChat.avatarImage}`;
  }, [currentChat.avatarImage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: any) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
      socket.current.on("msg-recieve1", (msg: any) => {
        setArrivalMessage({ fromSelf: false, image: msg.image });
      });
    }
  }, [socket, messages, arrivalMessage]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev: any) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

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
      <div className="chat-messages">
        {messages.map((message: any) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  {message.image ? (
                    message.image.endsWith(".mp4") ||
                    message.image.endsWith(".webm") ||
                    message.image.endsWith(".ogg") ? (
                      <video
                        src={`http://localhost:8080/images/${message.image}`}
                        style={{
                          width: "300px",
                          height: "200px",
                        }}
                        controls
                      />
                    ) : message.image.endsWith(".pdf") ||
                      message.image.endsWith(".doc") ||
                      message.image.endsWith(".docx") ||
                      message.image.endsWith(".txt") ? (
                      // show document element for document types
                      <a
                        href={`http://localhost:8080/images/${message.image}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {message.image}
                      </a>
                    ) : (
                      // show image element for image types
                      <img
                        src={`http://localhost:8080/images/${message.image}`}
                        alt=""
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    )
                  ) : (
                    <p>{message.message}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

export default React.memo(ChatContainer);

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
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
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
