const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/TrabajoWeb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Definir un esquema y modelo
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  unidades: { type: Number, required: true },
  features: { type: [String], required: true },
  image: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  usuario: {type:String,required: true},
  pass: {type:String,required: true},
  roll: {type:String,required: true}
})

const user = mongoose.model('usuario', productSchema);
const Product = mongoose.model('productos', productSchema);



// Rutas
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ 
      products
    });
  } catch (error) {
    res.status(500).send('Error al obtener los productos');
  }
});

app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).send('Error al crear el producto');
  }
});

app.post('/login', async(req,res) => {
  try{
    const login = await user.findOne({
      Usuario: req.body.user
    });
  }  
  catch(error){
    res.status(500).send('Error al obtener credenciales');
  }
  })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

