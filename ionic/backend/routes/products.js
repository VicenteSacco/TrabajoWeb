const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product'); 
const auth = require('../middleware/auth');
// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un producto por _id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Verifica si el id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'ID de producto inválido' });
    }

    const product = await Product.findById(id); 
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar descuento del producto
router.put('/:id/discount', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'No autorizado' });
  }

  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'ID de producto inválido' });
    }

    const { price, price2 } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { price, price2 },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar stock del producto
router.put('/:id/stock', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'No autorizado' });
  }

  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'ID de producto inválido' });
    }

    const { unidades } = req.body; 
    const product = await Product.findByIdAndUpdate(
      id,
      { unidades },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
