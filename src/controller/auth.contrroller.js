const UserModel = require("../models/user.model");

async function registerUserController(req,res) {
  try{
    const {name, email, password} = req.body;
    const existingUser = await UserModel.findOne({email});
    if(!name || !email || !password){
      return res.status(400).json({message: "All Fields are Required"});
    } 
    
    if(exisitingUser){
      return res.status(400).json({message: "User Already Exists"});
    } else{
      const newUser = new UserModel({name, email, password});
      await newUser.save();
      return res.status(201).json({message: 'User Registered Successfully'});
    }

  }
  catch(err){
    console.log(err);
    return res.status(500).json({message: "Internal Server Error"});
  }

   
}