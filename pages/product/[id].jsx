import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

// 获取api地址配置
const apiHost = process.env.REACT_APP_API_HOST

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.price_list[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  // ? 学习DISPATCH 的使用
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addProduct({...pizza, extras, price, quantity}));
  }, [dispatch]);


  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.price_list[sizeIndex] - pizza.price_list[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra.id !== option.id));
    }
  };

  const handleClick = () => {
    // 判断是否已经存在缓存TOKEN，用于标识唯一浏览器
    // if 存在，使用已经存在的
    // else 生成一个随机TOKEN
    // 用于捆绑cart 避免用户退出或者刷新后没有记录
    // 
    dispatch(addProduct({...pizza, extras, price, quantity}));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img_url}  layout="fill" width="50" heigth="60" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>￥{price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>选择分量</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>小碗</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>中碗</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>大碗</span>
          </div>
        </div>
        <h3 className={styles.choose}>选择额外的配料</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            添加到购物车
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    apiHost +`/api/v1/product/detail/${params.id}`
  );
  return {
    props: {
      pizza:  res.data,
    },
  };
};

export default Product;
