import User from "../models/userModel.js";
import APIError from "../utils/errors.js";
import bcrypt from "bcrypt";
import Response from "../utils/response.js";
import {createToken} from "../middlewares/auth.js";

//login
const login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new APIError("User not found!", 404);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new APIError("Password is incorrect!", 401);
  }

  //create token
  createToken(user, res);

};

//register
const register = async (req, res) => {
  //check email exists or not
  const { email } = req.body;

  const userCheck = await User.findOne({ email });

  if (userCheck) {
    throw new APIError("Email already exists!", 401);
  }

  //hash password
  req.body.password = await bcrypt.hash(req.body.password, 10);

  console.log("hash şifre : ", req.body.password);

  // save user to database
  const userSave = new User(req.body);

  await userSave
    .save()
    .then((data) => {
      //return response
      return new Response(data, "User created !").created(res);
    })
    .catch((err) => {
      throw new APIError( 400);
    });
};

const me = async (req, res) => {
  return new Response(req.user, "User found!").success(res);
};

export { login, register, me };
