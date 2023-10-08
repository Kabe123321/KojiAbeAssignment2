const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});

mongoose.connect('mongodb+srv://azazazaz678:SUZZjgvby6LoBV62@cluster0.2h4j44x.mongodb.net/DressStore?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

const productController = require('./controllers/productController');

app.post('/products', productController.createProduct);

app.get('/products', productController.getAllProducts);

app.put('/products/:id', productController.updateProduct);

app.delete('/products/:id', productController.deleteProduct);
