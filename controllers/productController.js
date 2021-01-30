const { Router } = require('express');
const validateProducts=require('./helpers/productsHelper')
const productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll();
    res.render('home', { title: 'Cubicle',products  })
});
router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' })
});

router.post('/create', validateProducts,(req, res) => {
    console.log(req.body);
    // validate input
  
    productService.create(req.body);  
    res.redirect('/products')
});


router.get('/details/:productId', (req, res) => { 
    
    let {productId} = req.params;

    let product = productService.getOne(productId);
    res.render('details', { title: 'Product details', product })
});




module.exports = router;