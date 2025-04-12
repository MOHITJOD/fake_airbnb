const mongoose= require("mongoose");
const schema = mongoose.Schema;
const defaultImageUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";

const listningSchema = new schema({
    title:{
        type:String,
        required : true,
    },

    description: {
        type:String,
        required : true,
    },

    image: {
       type:String,
    },
    
    price : {
        type:Number,
        required : true,
    },
    location:{
        type:String,
        required : true,
    },
    country:{
        type:String,
        required : true,
    },
})

const Listing = mongoose.model("Listing",listningSchema);
module.exports=Listing;



