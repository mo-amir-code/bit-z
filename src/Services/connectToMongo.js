const mongoose = require('mongoose');
require("colors")

module.exports = async () => {
    await mongoose.connect(process.env.DB_URI).then(() => {
        console.log('Databse connected'.green);
    }).catch(err => console.log(err));
}