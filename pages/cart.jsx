import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import { fetchCartCounter, fetchHisCart } from "../redux/cartSlice";


// 获取api地址配置
// const apiHost = process.env.REACT_APP_API_HOST;
const apiHost = "http://127.0.0.1:5000"


const Cart = ({cartList, quantity, total}) => {

  const cart = useSelector((state) => state.cart);
  // const carts = useSelector((state) => state.carts);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // 初始化购物车
    dispatch(fetchHisCart({cartList, quantity, total}))
  }, [dispatch]);
  // console.log("carts --->", props.cart)

  const createOrder = async (data) => {
    console.log("apiHost", process.env.REACT_APP_API_HOST)
    try {
      console.log("ready post ---->", apiHost)
      const res = await axios.post(apiHost + "/api/v1/order/new", data);
      console.log("post done---->", apiHost, res )
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };


  // const handleClick = () => {
  //   // 判断是否已经存在缓存TOKEN，用于标识唯一浏览器
  //   // if 存在，使用已经存在的
  //   // else 生成一个随机TOKEN
  //   // 用于捆绑cart 避免用户退出或者刷新后没有记录
  //   // 
  //   console.log("cartList --->", cartList)
  //   dispatch(fetchHisCart({cartList, quantity, total}))
  // };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img_url}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.title}>{product.name}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>￥{product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ￥{product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>￥{cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>￥0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>￥{cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                结算
              </button>
              {/* <PayPalScriptProvider
                options={{
                  "client-id":
                    "ATTL8fDJKfGzXNH4VVuDy1qW4_Jm8S0sqmnUTeYtWpqxUJLnXIn90V8YIGDg-SNPaB70Hg4mko_fde4-",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider> */}
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              现在支付
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
      {/* <button className={styles.button} onClick={handleClick}>
      加载历史购物车
          </button> */}
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    apiHost +`/api/v1/cart/all`
  );
  return {
    props: {
      cartList:  res.data.products,
      quantity: res.data.quantity,
      total: res.data.total
    },
  };
};

export default Cart;
