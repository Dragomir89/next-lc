import { Fragment } from "react";
import MainHeader from "./main-header";
// import classes from "./layout-module.css";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
