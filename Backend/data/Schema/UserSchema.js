const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profile:{type:String,required:true,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
},{
    timestamps:true
}
);

const Users=mongoose.model("Users",userSchema);
module.exports=Users;
