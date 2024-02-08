import User from "../models/userModel.js";
import APIError from "../utils/errors.js";
import bcrypt from "bcrypt";
import Response from "../utils/response.js";

//login
const login = async (req, res) => {
  console.log(req.body);

  return res.status(200).json({
    success: true,
    message: "Giriş Başarılı !",
    data: req.body,
  });
};

//register
const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await User.findOne({ email });

  if (userCheck) {
    throw new APIError("Email already exists!", 401);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  console.log("hash şifre : ", req.body.password);

  const userSave = new User(req.body);

  await userSave
    .save()
    .then((data) => {
      return new Response(data, "User created !").created(res);
    })
    .catch((err) => {
      throw new APIError( 400);
    });
};

export { login, register };
