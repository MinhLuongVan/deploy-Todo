const dotenv = require("dotenv");

dotenv.config({path: `.env.${process.env.NODE_ENV}`});
//Set up môi trường
module.exports = env = {
    JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY ,
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY ,
    MONGODB: process.env.MONGODB ,
    CLIENT_HOST: process.env.CLIENT_HOST,
    dbUserName: process.env.dbUserName,
    dbPassword: process.env.dbPassword,
    dbHostName: process.env.dbHostName,
    dbPort: process.env.dbPort,
    dbName: process.env.dbName
};

