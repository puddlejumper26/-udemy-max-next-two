import { Fragment, useEffect } from "react";
import path from "path";
import fs from "fs/promises";

export default function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <div>Loading</div>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "/dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.ppid; //<=== the same as in the folder name

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);
  if (!product) {
    return { noFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}
export async function getStaticPaths() {
  const data = await getData();

  // 接下来两步构建和需要获取的数据一样的结构
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { ppid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}
