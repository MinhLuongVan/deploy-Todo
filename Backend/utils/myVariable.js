const dotenv = require("dotenv");

dotenv.config({path: `.env.${process.env.NODE_ENV}`});
//Set up môi trường
module.exports = env = {
    JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY ,
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY ,
    MONGODB: process.env.MONGODB ,
    CLIENT_HOST: process.env.CLIENT_HOST,
};

