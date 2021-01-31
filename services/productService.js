const uniqId = require('uniqId');
const Cube = require('../models/Cube');

const productData=require('../data/productData');


function getOne(id) {
    // return productData.getOne(id);
    return Cube.getOne(id);
}

function getAll(query) {
    // let products = productData.getAll();
    let products = Cube.getAll();
    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if(query.from){
        products=products.filter(x=>Number(x.difficultyLevel)>=query.from);
        
    }    if(query.to){
        products=products.filter(x=>Number(x.difficultyLevel)<=query.to);
        
    }

    return products.sort((a,b)=>a.difficultyLevel-b.difficultyLevel || a.name.localeCompare(b.name));
}

function create(data) {
    let cube = new Cube(
        uniqId(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

//    return productData.create(cube);

   return cube.save();

}
module.exports = {
    create,
    getAll,
    getOne,
}