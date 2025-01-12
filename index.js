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

        // Sync without force to preserve existing data
        await sequelize.sync({ force: false, alter: true });
        console.log("Database Models Synchronized (Preserving Existing Data)");

        const channel = await CreateChannel();
        
        const productRoutes = require('./api/products');
        productRoutes(app, channel);

        app.listen(process.env.PORT || 8002, () => {
            console.log('Product Service is Listening to Port 8002');
        });
    } catch (error) {
        console.error('Error Starting Product Service:', error);
        process.exit(1);
    }
}

startApp();
