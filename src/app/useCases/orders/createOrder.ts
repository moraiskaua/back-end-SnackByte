import { Request, Response } from 'express';
import { Order } from '../../models/Order';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.APP_ID as string,
  key: process.env.KEY as string,
  secret: process.env.SECRET as string,
  cluster: process.env.CLUSTER as string,
  useTLS: true,
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { table, products } = req.body;

    const order = await Order.create({ table, products });
    const orderDetails = await order.populate('products.product');

    pusher.trigger('snackbyte@websocket', 'orders-new', orderDetails);
    res.status(201).json(order);
  } catch {
    res.sendStatus(500);
  }
};
