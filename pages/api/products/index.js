// import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token

  // dbConnect();

  if (method === "GET") {
    try {
      // const products = await Product.find();

      const products = [
        {
          "title": "a",
          "desc": "asdasdsa",
          "img": "https://media.istockphoto.com/photos/delicious-vegetarian-pizza-on-white-picture-id1192094401?k=20&m=1192094401&s=612x612&w=0&h=jesvXuPyvqM36GQ5QEvJrL3QZjK6YKsziUUF3ZbW0gw=",
          "prices": [12, 23]
        },
        {
          "title": "a",
          "desc": "asdasdsa",
          "img": "https://media.istockphoto.com/photos/delicious-vegetarian-pizza-on-white-picture-id1192094401?k=20&m=1192094401&s=612x612&w=0&h=jesvXuPyvqM36GQ5QEvJrL3QZjK6YKsziUUF3ZbW0gw=",
          "prices": [12, 15]
        }

      ]

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
