const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let products = [
    { id: 1, name: "Stylish Jacket", price: 49, stock: 10, img: "download.jpeg" },
    { id: 2, name: "Cool Sneakers", price: 69, stock: 15, img: "download (1).jpeg" },
    { id: 3, name: "Modern Watch", price: 99, stock: 5, img: "download (2).jpeg" },
    { id: 4, name: "Elegant Bag", price: 89, stock: 8, img: "download (3).jpeg" },
];

let orders = [];

// Endpoint to get all products
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Endpoint to place an order
app.post("/api/orders", (req, res) => {
    const order = req.body;
    orders.push(order);

    // Update stock levels
    order.items.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });

    res.json({ message: "Order placed successfully!" });
});

// Endpoint to get all orders
app.get("/api/orders", (req, res) => {
    res.json(orders);
});

// Endpoint to get current stock levels
app.get("/api/stock", (req, res) => {
    res.json(products);
});

// Endpoint to add a new product
app.post("/api/products", (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1; // Generate a new ID
    products.push(newProduct);
    res.json({ message: "Product added successfully!", product: newProduct });
});

// Endpoint to update a product
app.put("/api/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const index = products.findIndex(p => p.id === productId);

    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        res.json({ message: "Product updated successfully!", product: products[index] });
    } else {
        res.status(404).json({ message: "Product not found." });
    }
});

// Endpoint to delete a product
app.delete("/api/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: "Product deleted successfully!" });
    } else {
        res.status(404).json({ message: "Product not found." });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});