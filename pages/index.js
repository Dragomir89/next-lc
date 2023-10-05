import * as React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Fragment } from "react";

function HomePage(props) {
  const { test } = props;

  return (
    <Fragment>
      <h1>test</h1>
      <Link href="./add-options">Добави опции</Link>
      <Link href="./test-page">
        <Button>test</Button>
      </Link>
      <h1>HomePage</h1>
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
