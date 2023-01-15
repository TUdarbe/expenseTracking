import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import { useEffect } from "react";
import "firebaseui/dist/firebaseui.css";
import firebaseConfig from "../util/Fbconfig";

firebase.initializeApp(firebaseConfig);

var uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
      requireDisplayName: true,
    },
  ],
  signInFlow: "popup",
  signInSuccessUrl: "/dashboard",
};

function Authentication() {
  useEffect(() => {
    let ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <>
      <div id="signInContainer">
        <h1 id="signInTitle">Welcome</h1>
        <div id="firebaseui-auth-container"></div>
      </div>
    </>
  );
}

export default Authentication;
