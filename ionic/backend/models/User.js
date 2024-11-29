const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  usuario: { 
    type: String, 
    required: true,
    unique: true 
  },
  pass: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
  },
  datos: {
    rut: String,
    region: String,
    comuna: String
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('pass')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(pass) {
  try {
    return await bcrypt.compare(pass, this.pass); 
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
};

const User = mongoose.model('usuarios', userSchema);

module.exports = User;