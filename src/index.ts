import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import 'dotenv/config';

const app = express();

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    app.use((req, res, next) => {
      res.setHeader(
        'Access-Control-Allow-Origin',
        process.env.FRONT_END_URL as string,
      );
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });

    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads')),
    );

    app.use(express.json());
    app.use(router);

    app.listen(8080, () => console.log('🚀 Server is running'));
  })
  .catch(() => console.log('❌ Connection error'));
