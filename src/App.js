import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import "./scss/style.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import ProtectedRoute from "./ProtectedRoute";
import Alert from "./views/alert/Alert";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <ProtectedRoute path="/" component={TheLayout} />
            <Route path="*" render={(props) => <Page404 {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
