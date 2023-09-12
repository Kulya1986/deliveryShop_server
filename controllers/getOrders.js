const handleOrdersList = (req, res, db) =>{
    const {customer_email, customer_phone} = req.body;
    db.select('orders.order_id', 'orders.order_total', 'order_details.prod_id', 'order_details.prod_quantity', 'products.prod_name', 'products.prod_image', 'products.prod_price')
      .from('customers')
      .innerJoin('orders', 'customers.customer_id', 'orders.customer_id')
      .innerJoin('order_details', 'orders.order_id', 'order_details.order_id')
      .innerJoin('products',  'order_details.prod_id', 'products.prod_id')
      .where('customers.customer_email', '=', customer_email)
      .andWhere('customers.customer_phone', '=', customer_phone)
      .then(details => {
        if (details.length)
        {
            res.send(details);
        }
        else{
            res.status(400).json('no orders placed for this customer');
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json('failed to load orders')
    })
}

export default handleOrdersList;