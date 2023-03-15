import React, { useState, ChangeEvent, FormEvent } from "react";
import { RiUpload2Line } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
interface Props {
  handleSendMsg: (msg: string, file?: File) => void;
}

export default function ChatInput({ handleSendMsg }: Props) {
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState<any | undefined>();

  const sendChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (msg.length > 0 || file) {
      handleSendMsg(msg, file);
      setMsg("");
      setFile(undefined);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files;
    setFile(file);
  };

  return (
    <Container>
      <form onSubmit={sendChat} encType="multipart/form-data">
        <MyLabel className="label_style" htmlFor="msg-input">
          Type your message here:
        </MyLabel>
        <input
          className="input_style"
          id="msg-input"
          type="text"
          value={msg}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMsg(e.target.value)
          }
        />
        <MyLabel htmlFor="fileImage" className="label_style">
          <RiUpload2Line size={30} />
        </MyLabel>
        <UserInput type="file" id="fileImage" onChange={handleFileChange} />
        <MyButton type="submit" className="btn_style">
          Submit <IoMdSend key="send-icon" />
        </MyButton>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .label_style {
    color: white;
    justify-content: center;
    width: 15rem;
    padding: 0.5rem 0.5rem;
  }
`;

const MyLabel = styled.label`
 color: white,
  marginRight: 10px
`;

const MyButton = styled.button`
  margin-right: 15px;
`;

const UserInput = styled.input`
  display: none;
`;
