const Cube = require('../models/Cube');

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

//    return productData.create(cube);

   return cube.save();

}
module.exports = {
    create,
    getAll,
    getOne,
}