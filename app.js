require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/airbnb";

app.use(express.urlencoded({ extended : true }));
app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")))
const Listing = require("./models/listing.js");

main().then(()=>{
    console.log("connected to database!")
}).catch((err)=>{
    console.log("MongoDB Connection Error:");
    console.log(err);
})

async function main() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB URL being used:", dbUrl);
    } catch (err) {
        console.log("Error in mongoose.connect:");
        console.log(err);
        throw err;
    }
}

app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
});

app.get("/",(req,res)=>{
    res.render("listings/home.ejs");
})

//index route
app.get("/listings",async (req,res)=>{
let allListing = await Listing.find({});
res.render("listings/index.ejs", {allListing});
})

//full route
app.get("/listings/:id",async (req,res)=>{
    let {id}= req.params;
   const listing =await Listing.findById(id);
   res.render("listings/show.ejs",{listing});
})

//add new
app.get("/add",(req,res)=>{
res.render("listings/add.ejs");
});
app.post("/listings",async (req,res)=>{
    let listing = req.body.listing;
    // console.log(listing); 
    const newList = new Listing(listing);
    await newList.save();
    res.redirect("/listings");
})

//edit route
app.get("/listings/:id/edit", async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
//update
app.put("/listings/:id",async(req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})


//delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}= req.params;
   let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listings");
}); 












// app.get("/listing",(req,res)=>{
// let list1 = new Listing({
//     title:"bhurj khalifa",
//     image:"https://images2.minutemediacdn.com/image/upload/c_fill,w_1440,ar_1440:810,f_auto,q_auto,g_auto/shape/cover/sport/584459-istock-183342824-24fbfe616cffa90eb7dcf9d4aa8e445c.jpg",
//     description:"biggest and what you need more?",
//     price:249999,
//     location:"dubai",
//     country:"ADU",
// });
// let list2 = new Listing({
//     title:"Umed palace",
//     image:"",
//     description:"nice and beautiful!",
//     price:149999,
//     location:"Jodhpur",
//     country:"India",
// })

// list1.save()
//     .then(() => {
//         console.log(list1);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// list2.save()
//     .then(() => {
//         console.log(list2);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// res.send("ok done!");
// });