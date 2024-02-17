import express from 'express';
import mongoose from 'mongoose';
import { router } from './app/router';

mongoose
  .connect('mongodb://localhost:27017/SnackByte')
  .then(() => {
    const app = express();

    app.use(router);

    app.listen(8080, () => console.log('🚀 Server is running'));
  })
  .catch(() => console.log('❌ Connection error'));
