require('dotenv').config()
const express = require("express");
const cors = require("cors");
const {
    main
} = require('../database/configmg');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.paths = {
            usuarios: '/api/users',
            auth: '/api/auth',
            search: '/api/search',
            categories: '/api/categories',
            products: '/api/products'
        }
        //connect to db
        this.mongoDb()
        //MiddleWares
        this.middlewares()
        // Routes
        this.routes()
    }
    async pgDb() {
        await test();
    }
    async mongoDb() {
        await main();
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
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuarios, require('../routes/users'))
        this.app.use(this.paths.categories, require('../routes/categories'))
        this.app.use(this.paths.products, require('../routes/products'))
        this.app.use(this.paths.search, require('../routes/searcher'))
    }
    start() {
        this.app.listen(this.port, () => {
            console.log('Listen in port:' + this.port)
        })
    }

}
module.exports = Server;