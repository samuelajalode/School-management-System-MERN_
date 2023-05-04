import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { selectShowLoading } from "./store/slices/appSlice";
import { selectUser } from "./store/slices/userSlice";
import { SignedOutRoutes, SignedInRoutes } from "./ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TheLayout = React.lazy(() => import("./layouts/index"));

const Login = React.lazy(() => import("./pages/login/Login"));
const Reset = React.lazy(() => import("./pages/reset/Reset"));
const ForgetPassword = React.lazy(() =>
  import("./pages/forget/ForgetPassword")
);
const Page404 = React.lazy(() => import("./pages/page404/Page404"));
const Page500 = React.lazy(() => import("./pages/page500/Page500"));

function App() {
  const user = useSelector(selectUser);
  const loading = useSelector(selectShowLoading);

  console.log(loading);

  return (
    <Router>
      <ToastContainer />
      {loading && <Loading />}
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <SignedOutRoutes
            isAuth={user}
            exact={true}
            path="/login"
            name="Login Page"
            component={Login}
          />
          <SignedOutRoutes
            isAuth={user}
            exact={true}
            path="/password/reset/:id"
            name="Login Page"
            component={Reset}
          />
          <SignedOutRoutes
            isAuth={user}
            exact={true}
            path="/password/forget"
            name="Login Page"
            component={ForgetPassword}
          />
          <SignedInRoutes
            isAuth={user}
            path="/"
            name="Home"
            Component={TheLayout}
          />
          <Route
            path="/500"
            exact
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <Route
            path="*"
            exact={true}
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
