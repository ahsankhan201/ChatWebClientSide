import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { toastOptions } from "../../utils/toastOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../models/interfaces";
import { setUserProfile, updateUserIProfile } from "../../services/userService";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>(() => []);
  const [isLoading, setIsLoading] = useState<boolean>(() => true);
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(
    () => undefined
  );

  const setProfilePicture = async () => {
    if (!selectedAvatar) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }
    const user: UserInfo = JSON.parse(
      localStorage.getItem("userInfo")?.trim() as string
    );
    const { data } = (await updateUserIProfile(
      user._id,
      avatars[selectedAvatar]
    )) as { data: any };
    if (!data.isSet) {
      toast.error("Error setting avatar. Please try again.", toastOptions);
      return;
    }
    user.isAvatarImageSet = true;
    user.avatarImage = data.image;
    localStorage.setItem("userInfo", JSON.stringify(user));
    navigate("/");
    return;
  };

  const fetchAvatar = async () => {
    const data: string[] = [];
    for (let i = 0; i < 2; i++) {
      const { data: image } = (await setUserProfile()) as { data: any };
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
        <div>
          <h2>loading...</h2>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-12 bg-gray-900 h-screen w-screen">
          <div className="text-white">
            <h1 className="text-white">
              Pick an Avatar as your profile picture
            </h1>
          </div>
          <div className="flex gap-2">
            {avatars.map((avatar: any, index: any) => {
              return (
                <div
                  className={`class="border-4 border-transparent p-4 rounded-full flex justify-center items-center transition duration-500 ease-in-out" ${
                    selectedAvatar === index
                      ? "border-4 border-solid border-purple-600"
                      : ""
                  }`}
                >
                  <img
                    className="h-8 border-4 border-solid border-purple-600"
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="bg-purple-700 text-white px-8 py-4 border-none font-bold cursor-pointer rounded-md text-sm uppercase hover:bg-purple-80"
            onClick={setProfilePicture}
          >
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
