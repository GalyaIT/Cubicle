const {Router} = require('express');

const router = Router();

router.get('/',(req,res)=>{   
    res.render('home',{title:'Cubicle'})
});
router.get('/create',(req,res)=>{   
    res.render('create', {title:'Create Cube Page'})
});

router.post('/create', (req, res)=>{
    console.log(req.body);
    res.send('created')
})

router.get('/details/:productId',(req,res)=>{   
    res.render('details', {title:'Product details'})
});

module.exports=router;