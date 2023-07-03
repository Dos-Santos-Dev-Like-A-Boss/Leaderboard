const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan')
dotenv.config({ path: './.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception ! 💥 Shutting down ...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection  successfulyy'));

const port = process.env.PORT || 3000;
const server = app.listen(port, (req, res) => {
  console.log(`app running at port ${port}...`);
});