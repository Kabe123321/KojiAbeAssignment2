const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).send(savedProduct);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err);
    }
};

const mongoose = require('mongoose');

exports.updateProduct = async (req, res) => {
    try {
        const productId = mongoose.Types.ObjectId(req.params.id);
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found with ID: " + req.params.id });
        }
        res.status(200).send(updatedProduct);
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found with ID: " + req.params.id });
        }
        res.status(200).send({ message: "Product deleted successfully!" });
    } catch (err) {
        res.status(500).send(err);
    }
};

