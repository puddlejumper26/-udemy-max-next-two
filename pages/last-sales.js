import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);
  console.log("props", props);
  // const { data, error } = useSWR(
  //   "https://nextjs-practice-max-02-default-rtdb.firebaseio.com/sales.json"
  // );
  // // console.log("error - " + error);
  // console.log("data - ", data);
  // useEffect(() => {
  //   if (data) {
  //     const transformedSales = [];

  //     for (const key in data) {
  //       transformedSales.push({
  //         id: key,
  //         username: data[key].username,
  //         volumn: data[key].volumn,
  //       });
  //     }

  //     setSales(transformedSales);
  //   }
  // }, [data]);
  // console.log(1111111);
  // console.log("sales - ", sales);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     "https://nextjs-practice-max-02-default-rtdb.firebaseio.com/sales.json"
  //   )
  //     .then((res) => {
  //       let tem = res.json();
  //       console.log("response - ", tem);
  //       return tem;
  //     })
  //     .then((data) => {
  //       console.log("data - ", data);
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volumn: data[key].volumn,
  //         });
  //       }
  //       console.log("transformedSales - ", transformedSales);
  //       setSales(transformedSales);
  //       setIsLoading(false);
  //       console.log("sales - ", sales);
  //       console.log(1111111);
  //     });
  // }, []);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  console.log("sales - 2 - ", sales);
  if (!sales) {
    return <h1>No data yet</h1>;
  }

  return (
    <>
      <h1>hahaha</h1>
      <ul>
        <li>h</li>
        {/* <li>{sales[0].username}</li> */}
        {sales.map((a) => {
          <li>hahaha{a.username}</li>;
        })}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-practice-max-02-default-rtdb.firebaseio.com/sales.json"
  );
  // console.log("response - ", JSON.stringify(response));
  const data = await response;
  console.log("data -", data);
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volumn: data[key].volumn,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}

export default LastSalesPage;
