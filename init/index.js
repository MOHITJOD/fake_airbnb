const mongoose= require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");  


// Connect to MongoDB first
mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
  .then(() => {
    console.log("Connected to MongoDB successfully!");
   
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  }); 

const init = async () => {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("Data initialized successfully!");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
}

 // Only call init after connection is established
 init();
