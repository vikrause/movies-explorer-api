require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes');

const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors')

const { DATABASE, PORT } = process.env;
const { DEFAULT_DATABASE, DEFAULT_PORT } = require('./utils/config');

const app = express();

mongoose.connect(DATABASE || DEFAULT_DATABASE, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());
app.use(limiter);
app.use(cors);

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT || DEFAULT_PORT, () => {
  console.log("Я запусьтилься (＠´ー`)ﾉﾞ");
});
