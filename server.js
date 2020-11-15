const express = require("express");

const mong= require("mongoose");
const shortUrls = require("./models/shortUrls");

const ShortUrl = require("./models/shortUrls");

mong.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser:true,useUnifiedTopology:true
});

const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.get("/",async (req,res)=>{
    const shortUrls = await ShortUrl.find();
    res.render('index',{shortUrls:shortUrls});

}); 
app.get('/:shortUrls',async (req,res)=>{
    const short = await ShortUrl.findOne({short:req.params.shortUrls});
    if(short==null) return res.sendStatus(404);
    short.click++;
    short.save();
    res.redirect(short.full);
});

app.post("/shortUrls",async (req,res)=>{
   await ShortUrl.create({full:req.body.fullUrls});
   res.redirect("/");
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server has started at ${port}`);
});