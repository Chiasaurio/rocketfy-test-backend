const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  descripcion: { type: String, required: true },
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  sku: { type: String, required: true },
  stock: { type: Number, required: true },
  etiquetas: { type: Array, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);