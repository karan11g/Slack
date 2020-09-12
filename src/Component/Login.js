import React from "react";
import "../Styles/Login.css";
import { Button } from "@material-ui/core";
import Slacklogo from "../slacklogo.jpg";
import { provider, auth } from "../firebase.js";
import { useDatalayerValue } from "../Datalayer";
import { useHistory } from "react-router-dom";
function Login() {
  const [{}, dispatch] = useDatalayerValue();
  const history = useHistory();
  const signIn = () => {
    auth.signInWithRedirect(provider);
  };

  auth
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        console.log("logged in", result.user);
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
        history.push("/home");
      }
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log(error.code);
    });

  return (
    <div className="login">
      <div className="login__container">
        <img src={Slacklogo} alt="" className="login__logo" />
        <h2>Sign into FifthNote</h2>
        <p>fifthnote.slack.com</p>
        <Button className="login__button" onClick={signIn}>
          Sign into Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
