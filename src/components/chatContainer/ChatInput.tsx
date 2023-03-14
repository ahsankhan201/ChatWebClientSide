import React, { useState, ChangeEvent } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
interface Props {
  handleSendMsg: (msg: string) => void;
}

export default function ChatInput({ handleSendMsg }: Props) {
  const [msg, setMsg] = useState("");
  const sendChat = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <InputContainer onSubmit={sendChat}>
        <label className="label_style" htmlFor="msg-input">
          Type your message here:
        </label>
        <input
          className="input_style"
          id="msg-input"
          type="text"
          value={msg}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMsg(e.target.value)
          }
        />
        <button type="submit" className="btn_style" disabled={!msg}>
          Submit <IoMdSend key="send-icon" />
        </button>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  .label_style {
    color: white;
    margin-left: 2rem;
    justify-content: center;
    width: 15rem;
  }
  .input_style {
    width: 30rem;
    height: 2rem;
  }
  .btn_style {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 1rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
