import path from "path";
import fs from "fs";
import { Fragment } from "react";

function ProductDetailsPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <h1>Loading ...</h1>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}
///// този подход се използва ако искаме да прегенерираме сраници които се отварят по-често от други
export async function getStaticPaths() {
  return {
    paths: [
      // казва за кои ИД-та да има генерирани статични страници
      { params: { pid: "p1" } },
      { params: { pid: "p3" } },
    ],
    fallback: true, // когато е true ако страницата не е прадварително генерирана ще я вземе от сървъра
  };
}

export default ProductDetailsPage;
