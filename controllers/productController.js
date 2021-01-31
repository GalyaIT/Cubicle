const { Router } = require('express');
const { validateProduct } = require('./helpers/productsHelper')
const productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    // console.log(req.query);

    productService.getAll(req.query)
    .then(products=>{
        console.log(products);
         res.render('home', { title: 'Cubicle', products })
    })
    .catch(()=>res.status(500).end());
   
});


router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' })
});

//**with callback
// router.post('/create', validateProduct, (req, res) => {

//     productService.create(req.body, (err) => {
//         if (err) {
//            return res.status(500).end();
//         }
//         res.redirect('/products')
//     });

// });
//**with promise */
router.post('/create', validateProduct, (req, res) => {

    productService.create(req.body) 
    .then(()=>res.redirect('/products'))  
    .catch(()=>res.status(500).end());


});


router.get('/details/:productId', async (req, res) => {

    let { productId } = req.params;

    let product = await productService.getOne(productId);
    res.render('details', { title: 'Product details', product })
});




module.exports = router;