const mongoose = require("mongoose")
const URI = "mongodb+srv://neelb:nibb@cluster0.tnvmtf1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log("database successfully connected")
}
module.exports = {connectDB};