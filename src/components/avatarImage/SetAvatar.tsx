import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import { toastOptions } from "../../utils/toastOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../../utils/APIRoutes";
import { UserInfo, AvatarData } from "../../models/interfaces";
import { Avatarapi } from "../../constants/constants";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>(() => []);
  const [isLoading, setIsLoading] = useState<boolean>(() => true);
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(() => undefined);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user: UserInfo = JSON.parse(
        localStorage.getItem("userInfo")?.trim() as string
      );

      const { data } = await axios.post<AvatarData>(
        `${setAvatarRoute}/${user._id}`,
        {
          image: avatars[selectedAvatar],
        }
      );

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("userInfo", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  const fetchAvatar = async () => {
    const data: string[] = [];
    for (let i = 0; i < 2; i++) {
      const { data: image } = await axios.get(
        `${Avatarapi}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = Buffer.from(image);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
      return;
    }
    fetchAvatar();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <h2>loading</h2>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar: any, index: any) => {
              console.log(avatar);
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
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
