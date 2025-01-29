const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Manoj Mern Series Updated ccc ");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    // res.status(201).json({ message: "User registered successfully" });
    res.status(201).json({
      msg: "registration sucessful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // res.status(500).json("internal server error");
    next(error);
  }
};

// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
     console.log(userExist)
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    // const user = await bcrypt.compare(password, userExist.password);

    const user = await userExist.comparePassword(password)

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password " });
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};


// *-------------------
// to send data - User Logic
// *-------------------


const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log("userData", userData);
    return res.status(200).json({  userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};




module.exports = { home, register, login, user };
