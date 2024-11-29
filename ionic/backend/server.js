const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const productRoutes = require('./routes/products'); 
const carritoRoutes = require('./routes/carrito'); 

const app = express();
const port = 3000;
const JWT_SECRET = 'your_jwt_secret';

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/TrabajoWeb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Utiliza las rutas de productos
app.use('/products', productRoutes);
app.use('/carrito',carritoRoutes)

// Ruta de registro
app.post('/register', async (req, res) => {
  try {
    const { username, rut, email, region, comuna, password } = req.body;

    // Validar datos requeridos
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar si el usuario ya existe
    const existingUser  = await User.findOne({ $or: [{ usuario: username }, { email: email }] });
    if (existingUser ) {
      return res.status(400).json({ error: 'El usuario o email ya está registrado' });
    }

    // Crear nuevo usuario (la contraseña se encriptará automáticamente por el middleware)
    const newUser  = new User({
      usuario: username,
      pass: password,
      email: email,
      role: 'user',
      datos: { rut, region, comuna }
    });

    // Guardar usuario
    await newUser .save();

    // Generar token JWT
    const token = jwt.sign(
      { id: newUser ._id, usuario: newUser .usuario, role: newUser .role, email: newUser .email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Enviar respuesta
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: { id: newUser ._id, usuario: newUser .usuario, email: newUser .email, role: newUser .role }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      error: 'Error al registrar usuario',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  try {
    const { usuario, pass } = req.body;

    // Busca al usuario por su nombre de usuario
    const user = await User.findOne({ usuario });
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Verifica la contraseña
    const isMatch = await user.comparePassword(pass);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Genera un token JWT
    const token = jwt.sign(
      { id: user._id, usuario: user.usuario, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar respuesta con el token y los datos del usuario
    res.json({ token, user: { usuario: user.usuario, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
