import 'reflect-metadata';
import '~/config/env';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { env } from '~/config/env';
import { AppDataSource } from '~/config/data-source';
import { mountRouter } from '~/router/mount';
import { notfoundMiddleware } from '~/middleware/notfound';
import { globalErrorHandlerMiddleware } from '~/middleware/global-error';

const app = express();

const bootstrap = async () => {
  try {
    const connection = await AppDataSource.initialize();
    console.log(`Connected to database: ${connection.options.database}`);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: env.CLIENT_ORIGIN, methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
    app.use(morgan('dev'));

    app.use('/api/v1', mountRouter);
    app.use('*', notfoundMiddleware);
    app.use(globalErrorHandlerMiddleware);

    app.listen(env.PORT, () => {
      console.log(`Server is running on Port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

bootstrap();

// ======================== Event Listeners ========================
const EVENTS = [
  {
    event: 'SIGINT',
    listener: () => {
      console.log('Server is shutting down');
      process.exit(0);
    },
  },
];

EVENTS.forEach(({ listener, event }) => process.on(event, listener));
