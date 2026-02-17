const express = require("express")

const songRoutes = require("./routes/song.route")
const cors = require("cors")

const app = express()




    app.use(express.json())//middleware for req.body
    app.use(cors())

    app.use('/', songRoutes);
    







module.exports =  app