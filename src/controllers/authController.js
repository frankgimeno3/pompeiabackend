import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/users.model.js";
import cookie from "cookie";

export const register = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    console.log(req.body)
    const existingUser = await User.findOne({ usuario });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "Ya existe un usuario con el mismo correo electrónico",
        });
    }
    if (!password) {
      return res.status(400).json({ message: "La contraseña es requerida" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ usuario, password: hashedPassword });

    await newUser.save();

    const authValue = newUser._id.toString()
    const payload = {authValue}
    console.log(payload)
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.status(201).json({ authToken: authToken });

  } catch (error) {
    console.error(error);
    console.log(error)
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al registrar el usuario" });
  }
};
export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await User.findOne({ usuario });
    if (!user) {
      return res.status(401).json({ message: "Usuario inválido" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contra inválida" });
    }
    const authValue = user._id.toString()
    const payload = {authValue}
    console.log(payload)
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.status(200).json({ authToken: authToken });

    // res.setHeader('Set-Cookie', [
    //   cookie.serialize('accessToken', authToken, {
    //     httpOnly: true,
    //     maxAge: 60000 * 15,
    //   }),
    // ]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error al iniciar sesión" });
  }
};