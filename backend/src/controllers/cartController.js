const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const addCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId } = req.body;

        // Find the cart for the user or create a new one if it doesn't exist
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Fetch the product price
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            // Create a new cart if it doesn't exist
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity: 1 }],
                totalPrice: product.price, // Initialize totalPrice with the product price
            });
        } else {
            // If cart exists, check if the product is already in the cart
            const productIndex = cart.products.findIndex(
                (p) => p.product.toString() === productId
            );

            if (productIndex > -1) {
                // If the product is already in the cart, increment the quantity
                cart.products[productIndex].quantity += 1;
            } else {
                // If the product is not in the cart, add it with quantity 1
                cart.products.push({ product: productId, quantity: 1 });
            }

            // Recalculate the total price
            let newTotalPrice = 0;
            for (const item of cart.products) {
                const product = await Product.findById(item.product);
                if (product) {
                    newTotalPrice += product.price * item.quantity;
                }
            }
            cart.totalPrice = newTotalPrice;
        }

        // Save the cart
        await cart.save();

        // Send a success response
        res.status(201).json({
            message: "Product added to cart successfully",
            cart: cart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while adding the product to the cart",
            error: error.message,
        });
    }
};

const removeProduct = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId } = req.body;

        // Find the cart for the user
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the index of the product to remove
        const productIndex = cart.products.findIndex(
            (p) => p.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Recalculate the total price
        let newTotalPrice = 0;
        for (const item of cart.products) {
            const product = await Product.findById(item.product);
            if (product) {
                newTotalPrice += product.price * item.quantity;
            }
        }
        cart.totalPrice = newTotalPrice;

        // Save the updated cart
        await cart.save();

        // Send a success response
        res.status(200).json({
            message: "Product removed from cart successfully",
            cart: cart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while removing the product from the cart",
            error: error.message,
        });
    }
};

const reduceProductQuantity = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId } = req.body;

        // Find the cart for the user
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the index of the product to reduce
        const productIndex = cart.products.findIndex(
            (p) => p.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Reduce the quantity of the product
        if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
        } else {
            // If quantity is 1, remove the product from the cart
            cart.products.splice(productIndex, 1);
        }

        // Recalculate the total price
        let newTotalPrice = 0;
        for (const item of cart.products) {
            const product = await Product.findById(item.product);
            if (product) {
                newTotalPrice += product.price * item.quantity;
            }
        }
        cart.totalPrice = newTotalPrice;

        // Save the updated cart
        await cart.save();

        // Send a success response
        res.status(200).json({
            message: "Product quantity reduced successfully",
            cart: cart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while reducing the product quantity",
            error: error.message,
        });
    }
};

const emptyCart = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the cart for the user
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Empty the cart
        cart.products = [];
        cart.totalPrice = 0;

        // Save the updated cart
        await cart.save();

        // Send a success response
        res.status(200).json({
            message: "Cart emptied successfully",
            cart: cart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while emptying the cart",
            error: error.message,
        });
    }
};

module.exports = { addCart, removeProduct, reduceProductQuantity, emptyCart };
