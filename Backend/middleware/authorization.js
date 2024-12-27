const jwt=require('jsonwebtoken');
const User=require("../Schema/UserSchema.js");
const asyncHandler = require('express-async-handler');

const protect=asyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1];
            // decoded token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            // check if user still exists
            req.user=await User.findById(decoded.id).select("-password");
            next();
        }catch(error){
            resizeBy.status(401);
            throw new Error("Not Authorized, token failled");
        }

        if(!token){
            res.status(401);
            throw new Error("Not Authorized, no token");
        }
    }
});

module.exports= {protect};