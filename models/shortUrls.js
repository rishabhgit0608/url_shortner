const mong = require('mongoose');
const shortId =require('shortid');
const shortUrlScehma = new mong.Schema({
    full:{
        required:true,
        type:String
    },
    short:{
        type:String,
        required:true,
        default:shortId.generate
    },
    click:{
        type:Number,
        required:true,
        default:0
    }
    
});

module.exports=  mong.model('ShortUrl',shortUrlScehma);