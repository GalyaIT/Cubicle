const uniqId = require('uniqId');
const Cube = require('../models/Cube');
const fs = require('fs');
let productsData = require('../config/products.json');

const path = require('path');

function getOne(id){
    return productsData.find(x=>x.id==id);
}

function getAll(){
    return productsData;
}

function create(data) {
    let cube = new Cube(
        uniqId(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    productsData.push(cube);
   
    fs.writeFile(path.join(__dirname,'../config/products.json'), JSON.stringify(productsData), (err)=>{
        if(err){
            console.log(err);
            return;
        }
    });
}
module.exports = {
    create,
    getAll,
    getOne,
}