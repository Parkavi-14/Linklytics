const Url = require("../models/Url");
const validator = require("validator");
const generateShortCode = require("../utils/generateShortCode");

exports.createShortUrl = async (req,res)=>{

try{

const {originalUrl,customAlias}=req.body;

if(!validator.isURL(originalUrl)){

return res.status(400).json({

success:false,
message:"Invalid URL"

});

}

let code=customAlias || generateShortCode();

const exists=await Url.findOne({shortCode:code});

if(exists){

return res.status(400).json({

success:false,
message:"Short code already exists"

});

}

const url=await Url.create({

user:req.user._id,

originalUrl,

shortCode:code,

customAlias

});

res.status(201).json({

success:true,

data:url

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};
exports.getMyUrls = async(req,res)=>{

try{

const urls=await Url.find({

user:req.user._id

}).sort({

createdAt:-1

});

res.json({

success:true,

count:urls.length,

data:urls

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};
exports.deleteUrl=async(req,res)=>{

try{

await Url.findByIdAndDelete(req.params.id);

res.json({

success:true,

message:"Deleted Successfully"

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};
const Visit=require("../models/Visit");

exports.redirectUrl=async(req,res)=>{

try{

const url=await Url.findOne({

shortCode:req.params.code

});

if(!url){

return res.status(404).send("URL Not Found");

}

url.totalClicks++;

url.lastVisited=new Date();

await url.save();

await Visit.create({

url:url._id,

ip:req.ip,

userAgent:req.headers["user-agent"]


});

return res.redirect(url.originalUrl);

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};
exports.updateUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    if (url.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    url.originalUrl = originalUrl;

    await url.save();

    res.json({
      success: true,
      message: "URL updated successfully",
      data: url,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};