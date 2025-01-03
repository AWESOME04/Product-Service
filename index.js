const express = require('express');
const { CreateChannel } = require("./utils");
const cors  = require('cors');
const sequelize = require('./database/connection');
require('./database/models/Product');
const dotenv = require("dotenv");   
const proxy = require('express-http-proxy');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'))

const startApp = async() => {
    try {
        // Test the connection
        await sequelize.authenticate();
        console.log("Database Connection Established Successfully");

        // Drop all tables and recreate
        await sequelize.query('DROP TABLE IF EXISTS products CASCADE');
        await sequelize.query('DROP TYPE IF EXISTS enum_products_type CASCADE');
        
        // Force sync all models
        await sequelize.sync({ force: true });
        console.log("Database Models Synchronized");

        const channel = await CreateChannel();
        
        const productRoutes = require('./api/products');
        productRoutes(app, channel);

        app.listen(8002, () => {
            console.log('Product is Listening to Port 8002')
        })
    } catch (error) {
        console.log("Failed to start app:", error);
        process.exit(1); // Exit if we can't start properly
    }
}

startApp();
