import User from "../models/userModel.js";
import APIError from "../utils/errors.js";
import bcrypt from "bcrypt";

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

  try {
    const userSave = new User(req.body);

    await userSave
      .save()
      .then((response) => {
        return res.status(201).json({
          success: true,
          message: "Kullanıcı Kayıt Edildi !",
          data: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log("error", error);
  }
};

export { login, register };
