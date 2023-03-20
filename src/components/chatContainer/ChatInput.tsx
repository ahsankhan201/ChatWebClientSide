import { useState, ChangeEvent, FormEvent } from "react";
import { FaPaperclip, FaTimes } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
interface Props {
  handleSendMsg: (msg: string, file?: File) => void;
}

export default function ChatInput({ handleSendMsg }: Props) {
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [fileName, setFileName] = useState("");

  const sendChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (msg.length > 0 || file) {
      handleSendMsg(msg, file);
      setMsg("");
      setFile(undefined);
      setFileName("");
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files;
    setFileName(file[0].name);
    setFile(file);
  };

  const handleFileRemove = () => {
    setFile(undefined);
    setFileName("");
  };

  return (
    <div className="p-3">
      <form
        onSubmit={sendChat}
        encType="multipart/form-data"
        className="flex flex-row justify-between items-center align-center"
      >
        <div className="form_style">
          <input
            className="p-4 w-80 border border-solid border-indigo-600 rounded-md text-white w-full text-base focus:border-indigo-300 outline-none"
            placeholder="Type your message here"
            id="msg-input"
            type="text"
            value={msg}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMsg(e.target.value)
            }
          />
        </div>
        <div className="flex flex-row justify-between items-center align-center">
          {fileName && (
            <div className="flex flex-row justify-between items-center align-center">
              <span className="mr-8 flex flex-row justify-between items-center align-center">
                <span>{fileName}</span>
                <span onClick={handleFileRemove}>
                  <FaTimes size={16} />
                </span>
              </span>
            </div>
          )}

          <label htmlFor="fileImage" className="text-white mr-4">
            <FaPaperclip size={30} />
          </label>
          <input
            className="hidden "
            type="file"
            id="fileImage"
            onChange={handleFileChange}
          />
          <button type="submit" className="mr-8">
            <IoMdSend size={30} key="send-icon" />
          </button>
        </div>
      </form>
    </div>
  );
}
