const app = require("./app")
const PORT = process.env.PORT
const connectDB = require("./src/db/connectDB")
const userRoutes = require("./src/routes/user.routes")
const categoryRoutes = require("./src/routes/category.routes")
const productRoutes = require("./src/routes/product.routes")
const cartRoutes = require("./src/routes/cart.routes")
const reviewRoutes = require("./src/routes/review.routes")

connectDB();


app.use("/", userRoutes)
app.use("/", categoryRoutes)
app.use("/", productRoutes)
app.use("/", cartRoutes)
app.use("/", reviewRoutes)






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})