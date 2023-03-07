
    

const mongoose=require('mongoose');



const dotenv=require('dotenv').config();

const mongoURI=process.env.MONGO_URL || "mongodb+srv://user1:9665583311@virajdb.gbjegsn.mongodb.net/enotebook";



const connectToMongo=()=>{


    mongoose.connect(mongoURI,()=>{

        console.log("mongoose database connected succesfully",process.env.PORT || 5000 );
    })
}



module.exports=connectToMongo;