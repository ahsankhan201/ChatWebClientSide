import { v4 as uuidv4 } from "uuid";

interface Props{
    scrollRef:any
    messages:any
    openModel:any
}
const ChatMessages = ({scrollRef,messages,openModel}:Props) => {
  return (
    <div className="chat-messages">
        {messages.map((message: any) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"}`}
            >
              <div className="content">
                {
                message?.image ? (
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
                    <a
                      href={`http://localhost:8080/images/${message.image}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {message.image}
                    </a>
                  ) : (
                    <img
                      onClick={()=>openModel(message.image)}
                      src={`http://localhost:8080/images/${message.image}`}
                      alt=""
                      style={{
                        width: "100px",
                        height: "100px",
                        cursor:'pointer'
                      }}
                    />
                  )
                ) : (
                  null
                )}
                <p>{message?.message}</p>
              </div>
            </div>
          </div>
          
          );
        })}
      </div>
  )
}

export default ChatMessages