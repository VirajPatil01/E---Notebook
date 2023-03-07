const jwt = require('jsonwebtoken');

const dotenv=require('dotenv').config();
const JWT_SECRET="virajisgenius"

const fetchuser=(req , res, next)=>{

// function of this middleware function is to add id to the user and pass it to to next function


const token=req.header('auth-token');


if(!token){

    res.status(401).send({error:"please authenticate using valid token"});

}

try {
    
    const data=jwt.verify(token,JWT_SECRET);    
    req.user=data.user;
    next();


} catch (error) {
    
    res.status(401).send({error:"please authenticate using valid token"});
}
}



module.exports=fetchuser;
