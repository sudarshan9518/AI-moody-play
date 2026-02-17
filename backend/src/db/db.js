
const mongoose = require("mongoose")



function ConnectDB(){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("connected to db");
        
    })
    .catch((err)=>{
        console.log("error : ", err);
        
    })
}

module.exports = ConnectDB