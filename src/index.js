import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

import * as serviceWorker from "./serviceWorker";
import "./index.css";

// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import AppWrapper from "./containers/App/index";

import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = '541238526538-8s9nl2p6ihaskes8q9o8ha4mi1k1l2ho.apps.googleusercontent.com';
const root = createRoot(document.getElementById("root"));
ReactDOM.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
