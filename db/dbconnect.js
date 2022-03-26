require('dotenv').config();
const uri = process.env.MONGODB_URI;



const dbconnect = () => {

  //dB connection//////////
  const mongoose = require("mongoose");
  
  const conn_str = uri;
 
  mongoose.connect(
      conn_str,
      { 
          useNewUrlParser: true, 
          useUnifiedTopology: true 
      },(err) => {
          if (err) {
              console.log("error in connection",err);
          } else {
              console.log("mongodb is connected");
      }});


}

module.exports = dbconnect;