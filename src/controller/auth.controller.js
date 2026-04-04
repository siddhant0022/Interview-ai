const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function registerUserController(req,res) {
  try{
    const {name, email, password} = req.body;
    const existingUser = await UserModel.findOne({email});
    if(!name || !email || !password){
      return res.status(400).json({message: "All Fields are Required"});
    } 

    if(existingUser){
      return res.status(400).json({message: "User Already Exists"});
    } 

    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({name, email, password: hash});
    const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET_KEY, {expiresIn:'1h'});
    res.cookie("token", token);
    return res.status(201).json({message: "User Registered successsfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });




  }
  catch(err){
    console.log(err);
    return res.status(500).json({message: "Internal Server Error"});
  }

   
}

async function LoginUserController(req, res){
  try{
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({message: "All fields are required"});
    }
    const user = await UserModel.findOne({email});
    if(!user){
     return res.status(400).json({message: "Wrong Email"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(400).json({message: "Wrong Password"});
    }
    const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    res.cookie("token", token);
     res.status(201).json({
        message: "User Logged In successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })}
catch(err){
  console.log(err);
  return res.status(500).json({message: "Internal Server Error"});
}

}

async function LogoutUserController(req, res){
  res.clearCookie("token");
  return res.status(200).json({message: "User Logged out successfully"});


}

module.exports = {registerUserController, LoginUserController, LogoutUserController};