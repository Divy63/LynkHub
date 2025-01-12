const mongoose=require("mongoose");
const colors=require("colors");

const connectDatabase= async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{});

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.error(`Error: ${error.message}`.red.bold);
        process.exit();
    }
};

module.exports=connectDatabase;