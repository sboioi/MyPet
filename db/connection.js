require('dotenv').config();

const mongoose = require("mongoose");

let mongoDB = process.env.DB_CONNECTION;
mongoose.set("strictQuery", false);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoDB,{ useUnifiedTopology: true , useNewUrlParser: true } );

module.exports = mongoose.connection;