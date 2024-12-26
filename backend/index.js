const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path'); // using this can we can access the backend directory 
const cors = require('cors');
const { error, log } = require('console');


app.use(express.json()); //whatever req will get from response will be automatically  passed through json
app.use(cors());


//Database connection with Mongodb
mongoose.connect(
  "mongodb+srv://thesystemexee:practice345@cluster0.7oaoc.mongodb.net/e-commerce"
);

// API creation

app.get("/",(req, res)=>{
    res.send("Express app is running")
})

// Image storage engine 
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating upload endpoints for the images


app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating products

const Products = mongoose.model("Product",{
    id:{type: Number,
        required: true,
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    },

})


app.post('/addproduct',async (req,res)=>{
    let products = await Products.find({});
    let autoID;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        autoID = last_product.id+1;   
    }else{
        autoID=1;
    }

   const product = new Products({
    id:autoID,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
   });

   console.log(product);
   await product.save();
   console.log("Saved");
   res.json({
    success:true,
    name:req.body.name
   })
})

// Creating API's for deleting the product

app.post('/removeproduct', async (req,res)=>{
    await Products.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

// Creating api for getting all products

app.get('/allproducts',async (req,res)=>{
    let products = await Products.find({});
    console.log("All products fetched");
    res.send(products);
    
})

// Schema creating for users model

const Users = mongoose.model('Users',{
    name:{
        type:String,
        
    },
    email:{
        type:String,
        unique:true
    },
    password:String,
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now
    }
})

// Creating end-point registering the new user

app.post('/signup',async (req,res)=>{

    let check = await Users.find({email:req.body.email})
    if(check.length>0){
        return res.status(400).json({success:false, error:"Existing User found with Same emailID"})
    }

    let cart ={};
    for (let i = 0; i < 10; i++) {
        cart[i] =0;
        
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

// Creating end-point for user login
app.post('/login', async(req,res)=>{

    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data ={
                user:{
                    id:user.id
                }
            }
             const token = jwt.sign(data, "secret_ecom");
             res.json({
               success: true,
               token,
             });
        }else{
            res.json({success:false, error:"Incorrect Password"})
        }
       
    }else{
        res.json({
            success:false,
            error:"Wrong Email-ID"
        })
    }
})

// Creating end points for new Collection data

app.get('/newcollectiond', async (req,resp)=>{
    let products = await Products.find({});
    let newCollection = products.slice(1).slice(-8);
    console.log("New collection fetched");
    resp.send(newCollection);
})

// Creating endpoints for popular in women section
app.get('/popularinwomen', async (req,resp)=>{
    let products = await Products.find({category:'women'});
    let popularInWomen = products.slice(0,4);
    console.log("Popular in women is fetched");
    resp.send(popularInWomen);
})

// Creating middleware to fetch user 


const fetchUser = async (req,resp,next)=>{
    const token = req.header('auth-token');
    if(!token){
        resp.status(401).send({error:"Please authenticate using valid token"});
    }else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch(error){
            resp.status(401).send({error:"please authenticate using a valid token"})
        }
    }
}

//Creating end points for adding products in cartdata

app.post('/addtocart',fetchUser,async(req,resp)=>{
    console.log(req.body , req.user);
    
    // let userData = await Users.find({_id:req.user.id});
    // userData.cartData[req.body.itemId]+=1;
    // await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    // resp.send("Added");
})



app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port" +port);
    }else{
        console.log("Error :"+error);
        
    }

})