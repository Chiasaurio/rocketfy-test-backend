const express = require("express");
const productSchema = require("../models/product");

const router = express.Router();

//create product
router.post("/products", (req, res) => {
  const product = productSchema(req.body);
  product
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error }));
});

//get products
router.get("/products", (req, res) => {
  const { name } = req.query;
  const regexPattern = new RegExp(name, "i"); // 'i' flag makes it case-insensitive
  const query = name ? { nombre: { $regex: regexPattern } } : {};
  productSchema
    .find(query)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error }));
});

//get a product
router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error }));
});

//update a product
router.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { descripcion, nombre, imagen, sku, stock, etiquetas } = req.body;
  console.log(descripcion, nombre, imagen, sku, stock, etiquetas);
  productSchema
    .updateOne(
      { _id: id },
      { $set: { descripcion, nombre, imagen, sku, stock, etiquetas } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error }));
});

//delete a product
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error }));
});

module.exports = router;
