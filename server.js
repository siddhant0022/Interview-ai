const app = require('./src/app');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./src/config/db');
const redisClient = require('./src/config/redis');

const InitializeConnection = async() => {
  try{
    await Promise.all([connectDB(),redisClient.connect()]);
    console.log("Connected to Database and Redis");

     app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT)
     });

  } catch(err){
      console.log("Failed to connect to Database or Redis", err);
  }
}

const PORT = process.env.PORT || 5000;

InitializeConnection();

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
})

