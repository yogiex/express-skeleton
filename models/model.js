const mongose = require('mongoose');

const dataSchema = new mongose.Schema({
    nama: {
        type: String,
        lowercase: true,
        required: true
    },
    email: String,
    asalKota: String,
    nomerHp: Number  
});
const Data = mongose.model("dataPelanggan", dataSchema);
module.exports = Data; 
