import React, { useState } from "react";
import "../Styles/Header.css";
import { Avatar } from "@material-ui/core";
import { Search, Schedule, HelpOutline } from "@material-ui/icons";
import { useDatalayerValue } from "../Datalayer";
function Header() {
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useDatalayerValue();
  return (
    <div className="header">
      <div className="header__left">
        <Avatar
          className="headerleft__avatar"
          src={user.photoURL}
          alt={user.displayName}
        />
        <Schedule className="header__icons" />
      </div>
      <div className="header__center">
        <div className="header__searchContainer">
          <input
            placeholder="Search Fifthote"
            type="text"
            className="header__search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Search className="header__icons" />
        </div>
      </div>
      <div className="header__right">
        <HelpOutline className="header__icons" />
      </div>
    </div>
  );
}

export default Header;
