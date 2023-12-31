require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authenticateUser = require('./middleware/authentication')

//connection to Database
const ConnectDB= require('./db/connect')

//routers
const authRouter=require('./routes/auth')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
// app.get('/', (req, res) => {
//   res.send('jobs api');
// });
app.use('/index/',authRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await ConnectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
