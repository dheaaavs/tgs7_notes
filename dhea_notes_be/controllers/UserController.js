import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET
async function getUsers(req, res) {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// GET BY ID
async function getUserById(req, res) {
  try {
    const response = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// CREATE
async function createUser(req, res) {
  try {
    const { username, password} = req.body;
    if (!username || !password) {
      const msg = `field cannot be empty 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }
    const encryptPassword = await bcrypt.hash(password, 5);
    await User.create({
      username: username,
      password: encryptPassword
    });
    res.status(201).json({
      status: "Success",
      message: "User Created",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { username, password } = req.body;
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    if (!username || !password) {
      const msg = `field cannot be empty 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const encryptPassword = await bcrypt.hash(password, 5);
    let updateData = {name, email, gender, encryptPassword};

    await User.update(updateData, {
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(201).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

async function loginHandler(req, res){
  try{
      const{username, password} = req.body;
      const user = await User.findOne({
          where : {
              username: username
          }
      });

      if(user){
        const userPlain = user.toJSON(); // Konversi ke object
        const { password: _, refresh_token: __, ...safeUserData } = userPlain;


          const decryptPassword = await bcrypt.compare(password, user.password);
          if(decryptPassword){
              const accessToken = jwt.sign(safeUserData, process.env.ACCESS_TOKEN_SECRET, {
                  expiresIn : '30s' 
              });
              const refreshToken = jwt.sign(safeUserData, process.env.REFRESH_TOKEN_SECRET, {
                  expiresIn : '1d' 
              });
              await User.update({refresh_token:refreshToken},{
                  where:{
                      id:user.id
                  }
              });
              res.cookie('refreshToken', refreshToken,{
                  httpOnly : false, 
                  sameSite : 'none',
                  maxAge  : 24*60*60*1000,
                  secure:true
              });
              res.status(200).json({
                  status: "Succes",
                  message: "Login Berhasil",
                  safeUserData,
                  accessToken 
              });
          }
          else{
              res.status(400).json({
                  status: "Failed",
                  message: "Paassword atau email salah",
                
              });
          }
      } else{
          res.status(400).json({
              status: "Failed",
              message: "Paassword atau email salah",
          });
      }
  } catch(error){
      res.status(error.statusCode || 500).json({
          status: "error",
          message: error.message
      })
  }
}

async function logout(req,res){
  const refreshToken = req.cookies.refreshToken; 
  if(!refreshToken) return res.sendStatus(204);
  const user = await User.findOne({
      where:{
          refresh_token:refreshToken
      }
  });
  if(!user.refresh_token) return res.sendStatus(204);
  const userId = user.id;
  await User.update({refresh_token:null},{
      where:{
          id:userId
      }
  });
  res.clearCookie('refreshToken')
  return res.sendStatus(200);
}
export { getUsers, getUserById, createUser, updateUser, deleteUser,loginHandler, logout};