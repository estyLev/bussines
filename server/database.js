//const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/cars',{ useUnifiedTopology: true,useNewUrlParser: true })



const mongoose = require('mongoose');

//exports.handler = (event, context, callback) => {
mongoose.connect(
  'mongodb://localhost:27017/bussinesDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
),
  () => {
    try {
      //something
    } catch (error) {
      console.error(error);
    }
  };
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('🖥 Connection to DB was succesful');
});