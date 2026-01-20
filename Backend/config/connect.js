const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => console.log('DATABASE CONNECTED SUCCESSFULLY!')) 
.catch(e => console.log(e));