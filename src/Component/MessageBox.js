import React from "react";
import { Avatar } from "@material-ui/core";
import "../Styles/MessageBox.css";
import { useDatalayerValue } from "../Datalayer";

function MessageBox({ message, userName, timestamp }) {
  const [{ user }, dispatch] = useDatalayerValue();
  return (
    <div className="messageBox">
      {message && (
        <div className="messagebox__container">
          <Avatar variant="square" src={user.photoURL} alt={user.displayName} />
          <div className="messageBox__info">
            <h4>
              {userName}
              <span>
                {new Date(timestamp?.seconds * 1000).toLocaleTimeString()}
              </span>
            </h4>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageBox;
