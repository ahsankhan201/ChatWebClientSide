import { useState, useEffect } from "react";

export default function Welcome() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    setUserName(
      JSON.parse(localStorage.getItem("userInfo") as string).username
    );
  }, []);
  return (
    <div className="flex justify-center text-white flex-col">
      <h1>
        Welcome, <span style={{ color: "#4e0eff" }}>{userName}</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}
