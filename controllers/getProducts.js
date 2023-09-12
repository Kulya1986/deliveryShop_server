const handleProductsList = (req, res, db) =>{
    const {shop_id} = req.body;
    if (shop_id===0)
    {
        db.select('prod_id','prod_name','prod_image', 'prod_price').from('products').then(prods => {
            if (prods.length)
            {
                res.send(prods);
            }
            else{
                res.status(400).json('no products in the shop');
            }
        }).catch(err => {
            res.status(400).json('failed to load products')
        })
    }
    else
    {
        db.select('prod_id','prod_name','prod_image', 'prod_price').from('products')
        .where('shop_id','=',shop_id)
        .then(prods => {
            if (prods.length)
            {
                res.send(prods);
            }
            else{
                res.status(400).json('no products in the shop');
            }
        }).catch(err => {
                res.status(400).json('failed to load products')
        })
    }    
}

export default handleProductsList;