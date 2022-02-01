const router=require("express").Router();
const Cart = require("../models/Cart");
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require("./verifyToken")

//Post Cart

router.post("/",verifyToken,async(req,res)=>{
    const newCart= new Cart(req.body);

    try {
    const savedCarts=await newCart.save();
    res.status(200).json(savedCarts);
    } catch (err) {
        res.status(500).json(err)
    }
})
//UpdateCart

router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const updateProduct=await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
        res.status(200).json(updateProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Delete Cart

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
}) 

//Get Cart

router.get("/find/:userId", verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const cart=await Cart.findOne({userId:req.params.userId});
          
        res.status(200).json(cart);

    } catch (err) {
        res.status(500).json(err)
    }
})

//Get All Cart 

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const carts= await Cart.find();
        res.status(200).send(carts);
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports=router;