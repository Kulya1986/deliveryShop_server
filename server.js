import express from 'express';
import cors from 'cors';
import knex from 'knex';
import handleShopsList from './controllers/getShops.js';
import handleShopIDRequestByProduct from './controllers/getShopIDbyProduct.js';
import handleProductsList from './controllers/getProducts.js';
import handleOrdersList from './controllers/getOrders.js';
import handleOrderSubmit from './controllers/submitOrder.js';

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl:{rejectUnauthorized: false},
        host : process.env.DATABASE_HOST,
        port : 5432,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PW,
        database : process.env.DATABASE_DB
  }
})

const corsOptions = {
    origin: 'https://delivery-shop-csys.onrender.com',//'http://localhost:3001',(https://your-client-app.com)
    optionsSuccessStatus: 200,
};
 
const app = express();
app.use(express.json()); //middleware to parse JSON format of the frontend, from latest versions built-in the express library, no need to import bodyParser library
// app.use(cors());
app.use(cors(corsOptions));

//Getting list fo available shops from DB
app.get('/shops',(req,res) => { handleShopsList(req, res, db)})

//Getting shop_id by prod_id from DB
app.get('/shop-in-cart/:prod_id',(req, res) => { handleShopIDRequestByProduct(req, res, db)} )

//Getting ALL products if shop_id=0 and products of the shop on specified shop_id
app.post('/shop-products',(req, res) => {handleProductsList(req, res, db)})

//Submitting order , adding record for the customer to the orders table
app.post('/submit-order', (req, res) => {handleOrderSubmit(req, res, db)})

//Getting ALL orders of customer by email and phone
app.post('/orders-history',(req, res) =>{handleOrdersList(req, res, db)})

app.listen(3000, ()=>{
    console.log('App is running on port 3000');
})


