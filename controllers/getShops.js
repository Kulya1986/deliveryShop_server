const handleShopsList = (req, res, db) => {
    db.select('shop_id','shop_name').from('shops')
    .then(shops=>{
        res.send(shops)
    }).catch(err => {
        res.status(400).json('cannot load list of shops');
    })
}

export default handleShopsList;