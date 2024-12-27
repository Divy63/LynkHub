const asyncHandler=require('express-async-handler');
const User=require("../Schema/UserSchema");
const generateToken=require('../config/generateToken');


const registerUser= asyncHandler(async (req,res)=>{
    const {name,email,password,profile}= req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill in all fields");
    }  
    
    const userExists= await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error("User already exists!");
    }

    const user=await User.create({
        name,
        email,
        password,
        profile,
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profile:user.profile,
            token:generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("Failed to create user");
    }
    
});


const authenticateUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user && (await user.comparePassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profile:user.profile,
            token:generateToken(user._id),
        });
    }
});

// /api/user?search=xyz
const allUsers=asyncHandler(async(req,res)=>{
    
    // Search Query
    const searchName=req.query.search ? {
        $or:[
            {name :{ $regex: req.query.search,$options:"i"}},
            {email :{ $regex: req.query.search,$options:"i"}},
        ]
    }:{};

    // Quering the database to get results of users by name or email
    const users=await User.find(searchName).find({ _id :{$ne:req.user._id}});
    res.send(users);
});


module.exports = { registerUser, authenticateUser , allUsers };