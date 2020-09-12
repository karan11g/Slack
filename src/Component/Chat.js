import React, { useEffect, useState } from "react";
import "../Styles/Chat.css";
import { db } from "../firebase.js";
import { useParams } from "react-router-dom";
import { StarBorder, InfoOutlined, Send } from "@material-ui/icons";
import MessageBox from "./MessageBox";
import firebase from "firebase";
import { useDatalayerValue } from "../Datalayer";

function Chat() {
  const { channelId } = useParams();
  const [messages, setMessage] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useDatalayerValue();

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessage(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              messages: doc.data(),
            }))
          );
        });
    }
  }, [channelId]);

  useEffect(() => {
    console.log("dd", channelId);
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .get()
        .then((doc) => setChannelName(doc.data().channelName));
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      userName: user.dispalyName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Sent");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          # {channelName} <StarBorder fontSize="small" className="star" />
        </h4>

        <InfoOutlined fontSize="small" className="info" />
        <p>Deals</p>
      </div>
      <div className="chat__messageBox">
        {messages.map(({ id, messages }) => (
          <MessageBox
            key={id}
            message={messages.message}
            userName={messages.userName}
            timestamp={messages.timestamp}
          />
        ))}
        <MessageBox />
      </div>

      <div className="chat__footer">
        <div className="chat__inputContainer">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat__inputMessage"
            placeholder={`Send a message to # ${channelName}`}
          />

          <Send
            fontSize="small"
            className="chat__send"
            disable={!input}
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
