// import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method } = req;

  // await dbConnect();

  if (method === "GET") {
    try {
      // const orders = await Order.find();
      const orders = [
        {
          "id": "12",
          "customer": "ak",
          "address": "box hill 123",
          "total": 120,
          "status": 1,
          "method": 1
        }
      ]
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
