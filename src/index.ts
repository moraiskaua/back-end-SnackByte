import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

mongoose
  .connect('mongodb://localhost:27017/SnackByte')
  .then(() => {
    const app = express();

    app.use((req, res) => {
      res.setHeader(
        'Access-Control-Allow-Origin',
        process.env.FRONT_END_URL as string,
      );
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
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
