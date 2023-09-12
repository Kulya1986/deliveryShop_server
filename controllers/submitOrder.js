const handleOrderSubmit = (req, res, db) =>{
    const {shoppingCart, cartTotal, customerInfo} = req.body;
    
    db.transaction(trx => {
        trx('customers')
        .select('customer_id').from('customers')
        .where('customers.customer_email', '=', customerInfo.customer_email)
        .andWhere('customers.customer_phone', '=', customerInfo.customer_phone)
        .then(customerExist => {
            if(!customerExist.length)
            {
                return trx('customers')
                .returning('customer_id')
                .insert({
                    customer_name: customerInfo.customer_name,
                    customer_email: customerInfo.customer_email,
                    customer_address: customerInfo.customer_address,
                    customer_phone: customerInfo.customer_phone,
                    });
            }
            else
            {
                 return customerExist;
            }
        }).then(customerID => {
                        return trx('orders')
                            .returning('order_id')
                            .insert({
                                customer_id: customerID[0].customer_id,
                                order_total: cartTotal
                            })
                            .then(
                                orderID => {
                                    const order_positions=shoppingCart.map(element => {
                                            return(
                                                {
                                                    order_id: orderID[0].order_id,
                                                    prod_id: element.prod_id,
                                                    prod_quantity:element.prod_quantity
                                                }
                                                )
                                    })
                                    return trx('order_details')
                                        .returning('*')
                                        .insert(order_positions);
                                }).then(order => {
                                    res.status(200).json('order placed');
                                })
                    }).then(trx.commit)
                    .catch(trx.rollback)
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json('unable to place order')}); 
}

export default handleOrderSubmit;