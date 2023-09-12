const handleShopIDRequestByProduct = (req, res, db) =>{
    const {prod_id} = req.params;
    db.select('shop_id').from('products').where('prod_id',prod_id)
        .then(shop => {
            if (shop.length){
                res.json(shop[0]);
            }
            else {
                res.status(400).json('shop id does not exist');
            }
         }).catch(err => res.status(400).json('product not found'))   
}

export default handleShopIDRequestByProduct;