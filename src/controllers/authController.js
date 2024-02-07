import User from "../models/userModel.js";
import APIError from "../utils/errors.js";
import bcrypt from "bcrypt"

//login
const login = async (req, res) => {
  console.log(req.body);
};

//register
const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await User.findOne({ email });

  if (userCheck) {
    throw new APIError("Girmiş Olduğunuz Email Kullanımda !", 401);
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
        return res.status(400).json({
          success: false,
          message: "Kullanıcı Kayıt Edilemedi !",
          data: err,
        });
      });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({   
        success: false,
        message: "Kullanıcı Kayıt Edilemedi !",
        data: error,
        });
  }
};

export { login, register };
