import { Fragment } from "react";
import MainHeader from "./main-header";
import { CircularProgressProvider } from "../context/CircularProgressContext";
// import classes from "./layout-module.css";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>
        <CircularProgressProvider>{props.children}</CircularProgressProvider>
      </main>
    </Fragment>
  );
}

export default Layout;
