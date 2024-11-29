const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const auth = require('../middleware/auth');


router.get('/cart/:userId', auth, async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user.cart); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Actualizar el carrito del usuario
router.post('/cart/:userId', auth, async (req, res) => {
    const { productId, quantity } = req.body; 
    // Validar la entrada
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'productId y quantity son requeridos y quantity debe ser mayor que 0' });
    }
  
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      const existingItem = user.cart.find(item => item.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity; // Actualiza la cantidad
      } else {
        user.cart.push({ product: productId, quantity }); 
      }
      await user.save();
      res.json(user.cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Obtener la wishlist del usuario
router.get('/wishlist/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar un producto a la wishlist
router.post('/wishlist/:userId', auth, async (req, res) => {
    const { productId } = req.body; 
  
    // Validar la entrada
    if (!productId) {
      return res.status(400).json({ message: 'productId es requerido' });
    }
  
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Verificar si el producto ya está en la wishlist
      if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        await user.save();
      }
      res.json(user.wishlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;