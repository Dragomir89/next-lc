import { Fragment } from "react";
import MainHeader from "./main-header";
import { CircularProgressProvider } from "../context/CircularProgressContext";
import { AlertProvider } from "../context/AlertContext";
// import classes from "./layout-module.css";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>
        <AlertProvider>
          <CircularProgressProvider>{props.children}</CircularProgressProvider>
        </AlertProvider>
      </main>
    </Fragment>
  );
}

export default Layout;
