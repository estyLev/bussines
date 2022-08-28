
const express = require("express"); 
const app = express(); 
var cors=require('cors')
app.use(cors({origin:'http://localhost:3000'}))
require('./database')
app.use(express.json());
const port = process.env.PORT || 5000; 
const productsController = require('./controllers/products')
const ctegoryController = require('./controllers/categorys')
const usersController =require("./controllers/usersController")
app.use('/api/products',productsController)
app.use('/api/categories',ctegoryController)
app.use('/api/users',usersController)
app.listen(port, () => console.log(`Listening on port ${port}`)); 