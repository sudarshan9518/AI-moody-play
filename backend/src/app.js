const express = require("express")

const songRoutes = require("./routes/song.route")
const cors = require("cors")
const ConnectDB = require("./db/db")

const app = express()




    app.use(express.json())//middleware for req.body

    app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,
 
}))
     ConnectDB();
    app.use('/', songRoutes);
    







module.exports =  app