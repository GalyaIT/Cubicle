const uniqId = require('uniqId');
const Cube = require('../models/Cube');
const fs = require('fs');
let productsData = require('../config/products.json');

const path = require('path');

function getOne(id) {
    return productsData.find(x => x.id == id);
}

function getAll(query) {
    let result = productsData;
    if (query.search) {
        result = result.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if(query.from){
        result=result.filter(x=>Number(x.difficultyLevel)>=query.from);
        
    }    if(query.to){
        result=result.filter(x=>Number(x.difficultyLevel)<=query.to);
        
    }

    return result;
}

function create(data, callback) {
    let cube = new Cube(
        uniqId(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    productsData.push(cube);

    fs.writeFile(path.join(__dirname, '../config/products.json'),
        JSON.stringify(productsData),
        callback);

    // return fs.writeFile(path.join(__dirname,'../config/products.json'),
    //  JSON.stringify(productsData),
    // );

}
module.exports = {
    create,
    getAll,
    getOne,
}