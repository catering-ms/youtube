import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCounter } from "../redux/cartSlice";

// 获取api地址配置
const apiHost = process.env.REACT_APP_API_HOST

export default function Home({ pizzaList, admin, cart}) {

  const [sumQuantity, setQuan] = useState(cart.quantity)

  console.log("-cart---444-->", cart)
  const dispatch = useDispatch();
  useEffect(() => {
    // 初始化购物车
    dispatch(fetchCartCounter({sumQuantity}))
  }, [dispatch]);
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>在线购买螺蛳粉</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {/* {<AddButton setClose={setClose} />} */}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  const res = await axios.get(apiHost + "/api/v1/product/all");

  const res2 = await axios.get(apiHost + "/api/v1/cart/quantity");
  console.log("---->", res.data)
  return {
    props: {
      pizzaList: res.data,
      admin,
      cart: res2.data
    },
  };
};
