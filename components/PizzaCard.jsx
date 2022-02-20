import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";

const PizzaCard = ({ pizza }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza.id}`} passHref>
        <Image src={pizza.img_url} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{pizza.name}</h1>
      {/* 默认在菜单列表中显示small size的 */}
      <span className={styles.price}>${pizza.price_list[0]}</span>
      <p className={styles.desc}>{pizza.desc}</p>
    </div>
  );
};

export default PizzaCard;
