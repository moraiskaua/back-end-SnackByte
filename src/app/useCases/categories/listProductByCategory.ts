import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export const listProductByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const product = await Product.find().where('category').equals(categoryId);

    res.status(200).json(product);
  } catch {
    res.sendStatus(500);
  }
};
