const { Router } = require('express');

const productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll();
    res.render('home', { title: 'Cubicle',products  })
});
router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' })
});

router.post('/create', (req, res) => {
    console.log(req.body);
    // validate input
  
    productService.create(req.body);

  
    res.redirect('/products')
})

router.get('/details/:productId', (req, res) => {
    res.render('details', { title: 'Product details' })
});

module.exports = router;