import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { errors } from 'celebrate';
import createError from 'http-errors';
import fileUpload from 'express-fileupload';
import * as statusCodes from '@constants/statusCodes';
import router from './routes';

import 'dotenv/config';

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
  }),
);

app.use('/api/v1', router);

app.use(errors());

// catch 404 and forward to error handler
app.use((_, __, next) => {
  next(createError(statusCodes.HTTP_NOT_FOUND));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || statusCodes.HTTP_SERVER_ERROR);
  const response = { message: err.message, error: err.status };
  res.send(response);
  next();
});
export default app;
