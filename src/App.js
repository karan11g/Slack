import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./Component/Login";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar";
import Chat from "./Component/Chat";
import { useDatalayerValue } from "./Datalayer";

function App() {
  const [{ user }, dispatch] = useDatalayerValue();
  return (
    <Router>
      {/* <Header></Header> */}
      <div className="app">
        <Switch>
          {user && (
            <div>
              <Route path="/channel/:channelId">
                <Header></Header>
                <div className="app__content">
                  <Sidebar></Sidebar>
                  <Chat></Chat>
                </div>
              </Route>
              <Route path="/home">
                <Header></Header>
                <div className="app__content">
                  <Sidebar></Sidebar>
                </div>
              </Route>
            </div>
          )}
          <Route path="/">
            <Login></Login>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
