require('dotenv').config()
const express = require("express");
const cors = require("cors");

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users'
        //MiddleWares
        this.middlewares()
        // Routes
        this.routes()
    }
    middlewares() {
        //cors
        this.app.use(cors())

        //Read and Parse
        this.app.use(express.json())
        //Public directory
        this.app.use(express.static('public'))
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/users'))
    }
    start() {
        this.app.listen(this.port, () => {
            console.log('Listen in port:' + this.port)
        })
    }

}
module.exports = Server;