const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoute')
const app = express();



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/leaderboard', userRouter);

app.all('*', (req, res, next) => {
  next(`can't find ${req.originalUrl} on this server !`);
});

module.exports = app;