import React, { useState, useEffect } from "react";
import { Contact, ContactsProps, UserInfo } from "../../models/interfaces";

function Contacts({ contacts, changeChat }: ContactsProps) {
  const [currentUserName, setCurrentUserName] = useState<string | undefined>();
  const [currentUserImage, setCurrentUserImage] = useState<string>("");
  const [currentSelected, setCurrentSelected] = useState<number | undefined>();

  useEffect(() => {
    const data: UserInfo | null = JSON.parse(
      localStorage.getItem("userInfo") as string
    );
    setCurrentUserName(data?.username);
    setCurrentUserImage(data?.avatarImage || "");
  }, []);

  const changeCurrentChat = (index: number, contact: Contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
        <div className="maindivcon">
          <div className="flex items-center justify-center">
            <h3 className="text-white uppercase">Technovez Chat</h3>
          </div>
          <div className="flex flex-col items-center space-between overflow-auto gap-1">
            {contacts.map((contact: Contact, index: any | undefined) => (
              <div
                key={contact._id}
                className={`flex flex-col items-center overflow-auto gap-1 ${
                  index === currentSelected ? "custompurple" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    className="h-12"
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                </div>
                <div className="text-white uppercase">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 contactBg">
            <div className="avatar">
              <img
                className="h-12"
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="text-white uppercase">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Contacts);
