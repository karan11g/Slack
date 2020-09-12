import React, { useState, useEffect } from "react";
import "../Styles/Sidebar.css";
import { db } from "../firebase.js";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import {
  Edit,
  FiberManualRecord,
  Inbox,
  Drafts,
  TurnedInNot,
  PeopleAlt,
  Apps,
  FileCopy,
  Comment,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import SidebarContact from "./SidebarContact";
import { Collapse, List, IconButton } from "@material-ui/core";
function Sidebar() {
  const [open, setOpen] = useState(false);
  const [channels, setChannel] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const unsubscribe = db
      .collection("channels")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        setChannel(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            channels: doc.data(),
          }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(channels);
  const addChannel = () => {
    const name = prompt("Enter Channel Name");
    if (name) {
      db.collection("channels").add({
        channelName: name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    history.push("/home");
  };
  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__header">
          <div className="sidebar__domain">
            <h4>fifthnote</h4>
            <Edit className="sidebar__edit" />
          </div>
          <div className="sidebar__user">
            <FiberManualRecord fontSize="small" className="sidebar__round" />
            <p>Karan Garg</p>
          </div>
        </div>
        <div className="sidebar__component">
          <div className="sidebar__options">
            <SidebarContact name="Threads" icon={<Comment />} />
            <SidebarContact name="Mentions & Reacions" icon={<Inbox />} />
            <SidebarContact name="Saved Items" icon={<Drafts />} />

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <SidebarContact name="Channel Browser" icon={<TurnedInNot />} />
                <SidebarContact
                  name="People and user groups"
                  icon={<PeopleAlt />}
                />
                <SidebarContact name="Apps" icon={<Apps />} />
                <SidebarContact name="FileBrowser" icon={<FileCopy />} />
              </List>
            </Collapse>
            <IconButton className="sidebar__iconButton" onClick={handleClick}>
              {open ? (
                <SidebarContact name="Show Less" icon={<ExpandLess />} />
              ) : (
                <SidebarContact name="Show More" icon={<ExpandMore />} />
              )}
            </IconButton>
          </div>
          <div className="sidebar__channel">
            <div onClick={addChannel}>
              <SidebarContact name="Add Channel" icon="+" />
            </div>
            {channels.map(({ id, channels }) => (
              <SidebarContact name={channels.channelName} icon="#" id={id} />
            ))}
            {/* <SidebarContact name="Channel" icon={<ExpandMore />} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
