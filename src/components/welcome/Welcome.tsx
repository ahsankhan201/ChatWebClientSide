import React, { useState, useEffect } from "react";
import styled from "styled-components";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(
      JSON.parse(localStorage.getItem("userInfo") as string).username
    );
  }, []);
  return (
    <Container>
      <h1>
        Welcome, <span>{userName}</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

{
  /* <img src={Robot} alt="" /> */
}
// import Robot from "../assets/robot.gif";
