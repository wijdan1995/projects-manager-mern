const express = require("express");
const cors = require('cors');
require('dotenv').config()
const morgan = require('morgan');
const app = express();
const connectDB = require("./server/config/mongoose.config");
const projectRoutes = require("./server/routes/project.routes")
const userRoutes = require("./server/routes/user.routes")
const port = process.env.PORT;

// This will fire our mongoose.connect statement to initialize our database connection
connectDB()

app.use(morgan('dev')) // info abut the req
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

// This is where we import the project routes function from our project.routes.js file
app.use("/api/users", userRoutes)
app.use("/api/projects", projectRoutes)

app.listen(port, () => console.log(`Listening on port: ${port}`) );
