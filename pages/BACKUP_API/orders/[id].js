// import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  // await dbConnect();

  if (method === "GET") {
    try {
      // const order = await Order.findById(id);


      // const orders = await Order.find();
      const order = {
          "_id": "10001",
          "customer": "拧MOON",
          "address": "苏州，乾隆街道10001",
          "total": 120,
          "status": 1,
          "method": 1
        }
        
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
  }
};

export default handler;
