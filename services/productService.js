const uniqId = require('uniqId');
const Cube = require('../models/Cube');
const fs = require('fs');
let productsData = require('../config/products.json');

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
console.log(cube);
    productsData.push(cube);

    fs.writeFile(__dirname + '/../config/products.json', JSON.stringify(productsData), (err)=>{
        if(err){
            console.log(err);
            return;
        }
    });
}
module.exports = {
    create
}