import * as React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <h1>LC Brokers</h1>
    </Fragment>
  );
}

// изпълнява се тази функция
// след което се извиква ф-ята на компунента
// след това рендериранният HTML на съвъра се пръща на клиента
export async function getStaticProps() {
  console.log("call on server getStaticProps");

  return {
    props: { test: "test" },
    // revalidate: 15, /// ако го има това проп, информацията ще се ъпдейтва на всеки Х секунди
    // секундите работят само когато се билдне проекта
  };
}

export default HomePage;
