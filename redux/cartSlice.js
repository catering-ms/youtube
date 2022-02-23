import { createSlice } from "@reduxjs/toolkit";


// 获取api地址配置
// const apiHost = process.env.REACT_APP_API_HOST
const apiHost= "http://127.0.0.1:5000"

const initState = {
  "products": [
    {
      "quantity": 1,
      "total": 12.2,
      "price": 12.2,
      "name": "木薯2",
      "desc": "allala",
      "img_url": "https://www.zhifure.com/upload/images/2018/9/17113536844.jpg",
      "extras": [
        {
          "text": "aaa",
          "price": 2.0
        }
      ]
    }
  ],
  "quantity": 1,
  "total": 12.2
}


// const res = await axios.get(
//   apiHost +`/api/v1/cart/all`
// );

const cartSlice = createSlice({
  name: "cart",
  // 初始化
  // 判断TOKEN是否存在，通过token查询数据库历史购物车
  // 完成列表
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    fetchHisCart: (state, action) => {
      console.log("==========>", action.payload.cartList)
      state.products = action.payload.cartList;
      state.quantity = action.payload.quantity; // TODO获取数据
      state.total = action.payload.total;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    // 重置
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { fetchHisCart, addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;

// export const getServerSideProps = async (ctx) => {
//   const res = await axios.get(apiHost + "/api/v1/cart/all");
//   console.log("---->", res.data)
//   return {
//     props: {
//       cartList: res.data
//     },
//   };
// };

// function Page({ data }) {
//   // Render data...
// }

// // This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://.../data`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: { data } }
// }

// export default Page