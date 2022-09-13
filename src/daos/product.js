const { Schema, model } = require('mongoose');

//Un producto dispondrá de los siguientes campos: id, timestamp, nombre,
//descripcion, código, foto (url), precio, stock
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: false,
    },
    photo: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },

});


module.exports = model('Producto', productSchema);