import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export const listOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 })
      .populate('products.product');

    res.status(200).json(orders);
  } catch {
    res.sendStatus(500);
  }
};
