const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception ! 💥 Shutting down ...');
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('DB connection  successfulyy'));

const port = process.env.PORT || 3030;
const server = app.listen(port, (req, res) => {
  console.log(`app running at port ${port}...`);
});