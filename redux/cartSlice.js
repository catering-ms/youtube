import { createSlice } from "@reduxjs/toolkit";


// 获取api地址配置
// const apiHost = process.env.REACT_APP_API_HOST
const apiHost= "http://127.0.0.1:5000"


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
      if (state.products.length === 0)  {
        console.log("==========>", action.payload.cartList)
        state.products = action.payload.cartList;
        state.quantity = action.payload.quantity; // TODO获取数据
        state.total = action.payload.total;
      }
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