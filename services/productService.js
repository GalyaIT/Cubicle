const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
// const productData=require('../data/productData');


 function getOne(id) {   
  return Cube.findById(id).lean();   
}

async function getAll(query) {
    // let products = productData.getAll();
    // let products = Cube.getAll();
    let products = await Cube.find({}).lean();
    console.log(products);
    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if(query.from){
        products=products.filter(x=>Number(x.difficultyLevel)>=query.from);
        
    }    if(query.to){
        products=products.filter(x=>Number(x.difficultyLevel)<=query.to);
        
    }

    // return products.sort((a,b)=>a.difficultyLevel-b.difficultyLevel || a.name.localeCompare(b.name));
    return products;
}

function create(data) {
    let cube = new Cube(data);
   return cube.save();

}

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId)
    let accessory = await Accessory.findById(accessoryId);

    product.accessories.push(accessory);
    return product.save();
}


module.exports = {
    create,
    getAll,
    getOne,
    attachAccessory,
}