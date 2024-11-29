const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 

module.exports = (req, res, next) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó ningún token.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; 
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.', error: error.message });
  }
};