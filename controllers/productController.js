const { Router } = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const { validateProduct } = require('./helpers/productsHelper')
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
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


router.get('/create', isAuthenticated,(req, res) => {
    res.render('create', { title: 'Create Cube Page' })
});

router.post('/create',isAuthenticated, validateProduct, (req, res) => {

    productService.create(req.body, req.user._id) 
    .then(()=>res.redirect('/products'))  
    .catch(()=>res.status(500).end());
});


router.get('/details/:productId', async (req, res) => {

    let { productId } = req.params;

    let product = await productService.getOneWithAccessories(productId);
 
    res.render('details', { title: 'Product details', product })
});

router.get('/:productId/attach',isAuthenticated, async (req, res) => {
    let { productId } = req.params;
    let product = await productService.getOne(productId);
    let accessories = await accessoryService.getAllUnattached(product.accessories);
    res.render('attachAccessory', {product, accessories});
});

router.post('/:productId/attach', isAuthenticated,(req, res) => {
   
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
});

router.get('/:productId/edit',isAuthenticated, async (req, res) => {
   
    productService.getOne(req.params.productId)
    .then(product=>{        
          res.render('editCube', product);
    })
 
});
router.post('/:productId/edit', isAuthenticated, validateProduct, (req, res) => {
    productService.updateOne(req.params.productId, req.body)
        .then(response => {
            res.redirect(`/products/details/${req.params.productId}`);
        });
});
router.get('/:productId/delete',isAuthenticated, async (req, res) => {
   
    productService.getOne(req.params.productId)
        .then(product => {
            if (req.user._id != product.creator) {
                res.redirect('/products')
            } else {
                res.render('deleteCube', product);
            }
        });
 
});
router.post('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            // if (product._id !== req.user._id) {
            //     return res.redirect('/products');
            // }

            return productService.deleteOne(req.params.productId)
        })
        .then(response => res.redirect('/products'));
});


module.exports = router;