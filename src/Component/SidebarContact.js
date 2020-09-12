import React from "react";
import "../Styles/SidebarContact.css";
import { Link } from "react-router-dom";
function SidebarContact({ name, icon, id }) {
  return (
    <Link to={id ? `/channel/${id}` : "/home"}>
      <div className="sdiebarContact">
        {icon}
        <h4 className="sidebarConatct__name"> {name}</h4>
      </div>
    </Link>
  );
}

export default SidebarContact;
