//Requiring the dotenv module
const dotenv = require('dotenv');
//Reading the dotenv configuration
dotenv.config({ path: './config.env' });
//Requiring Modules
const app = require('./app');
const mongoose = require('mongoose');

//Connecting to database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    userNewUrlParser: true,
    userCreateIndex: true,
    userFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

//Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`APP running on port ${port}...`);
});
