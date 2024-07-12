const mongoose= require("mongoose");

// mongoose.connect("mongodb+srv://nehasurati1605:nehashish@cluster0.1j1m1ey.mongodb.net/");

const database= async()=>{
   try {
    await mongoose.connect("mongodb+srv://nehasurati1605:nehashish@cluster0.1j1m1ey.mongodb.net/AdminUser");
   //  await mongoose.connect("mongodb://localhost:27017");

    console.log("Database connected..!")
   } catch (error) {
    console.log(error);
   }
}
module.exports= database
