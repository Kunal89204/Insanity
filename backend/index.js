const app = require("./app")
const PORT = process.env.PORT
const connectDB = require("./src/db/connectDB")
const userRoutes = require("./src/routes/user.routes")
const categoryRoutes = require("./src/routes/category.routes")
const productRoutes = require("./src/routes/product.routes")
const cartRoutes = require("./src/routes/cart.routes")
const reviewRoutes = require("./src/routes/review.routes")

connectDB();


app.use("/api/v1", userRoutes)
app.use("/api/v1", categoryRoutes)
app.use("/api/v1", productRoutes)
app.use("/api/v1", cartRoutes)
app.use("/api/v1", reviewRoutes)






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})