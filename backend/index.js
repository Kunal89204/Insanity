const app = require("./app")
const PORT = process.env.PORT
const connectDB = require("./src/db/connectDB")
const userRoutes = require("./src/routes/user.routes")
const categoryRoutes = require("./src/routes/category.routes")

connectDB();


app.use("/api/v1", userRoutes)
app.use("/api/v1", categoryRoutes)






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})