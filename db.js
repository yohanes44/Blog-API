
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);


mongoose.connection.on("connected", ()=>{
    console.log("DB Connected");
})

mongoose.connection.on("disconnected", ()=>{
    console.log("DB Disconnected");
})