const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");

const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const productRoute=require("./routes/product");
const cartRoute=require("./routes/cart");
const orderRoute=require("./routes/order");
const stripeRoute=require("./routes/stripe");

dotenv.config();
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

mongoose.connect("mongodb://baraa:1234@cluster0-shard-00-00.hxdsm.mongodb.net:27017,cluster0-shard-00-01.hxdsm.mongodb.net:27017,cluster0-shard-00-02.hxdsm.mongodb.net:27017/lama?ssl=true&replicaSet=atlas-597s9d-shard-0&authSource=admin&retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{
    console.log("DB is working well");
})
.catch((err)=>{
    console.log(err);
})

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/carts",cartRoute);
app.use("/api/checkout",stripeRoute);


app.listen(process.env.PORT||5000,()=>{
    console.log("Backend server is running");
});
