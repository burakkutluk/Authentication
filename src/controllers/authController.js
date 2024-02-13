import User from "../models/userModel.js";
import APIError from "../utils/errors.js";
import bcrypt from "bcrypt";
import Response from "../utils/response.js";
import {createToken} from "../middlewares/auth.js";
import crypto from "crypto";
import sendMail from "../utils/sendMail.js";
import moment from "moment";

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

// get user
const me = async (req, res) => {
  return new Response(req.user, "User found!").success(res);
};

// send mail
const forgetPass = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new APIError("User not found!", 404);
  }

  //create reset code
  const resetCode = crypto.randomBytes(32).toString("hex");

  await sendMail({
    from: "base.api.proje@gmail.com",
    to: user.email,
    subject: "Reset Password",
    text: `Reset code : ${resetCode}`,
  })

  await User.updateOne({
    email: user.email
  }, {
    reset: {
      code: resetCode,
      time: moment(new Date()).add(10, "minutes").format("YYYY-MM-DD HH:mm:ss")
    }
  })
  return new Response(null, "Email sent.").success(res);
}

export { login, register, me, forgetPass };
