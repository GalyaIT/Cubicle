const Accessory = require('../models/Accessory');

function getAll(){
return Accessory.find({}).lean();
}
function create(data) {
    let accessory = new Accessory(data);

   return accessory.save();

}
function getAllUnattached(ids){
    return Accessory.find({_id:{$nin:ids}}).lean();
}

module.exports = {
    create,
    getAll,
    getAllUnattached,
}