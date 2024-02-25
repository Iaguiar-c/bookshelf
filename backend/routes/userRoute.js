import express from "express";
import { User } from "../models/userModel.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const router = express.Router();

// Rota para registrar um novo usuário
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // ver se o usuário já existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Criar um novo usuário com a senha hasheada
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// fazer login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ email });

    if (user) {
      // Comparar senhas usando bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Usuário autenticado com sucesso
        res.json({
          success: true,
          message: "Login successful",
          userId: user._id,
          username: user.username,
          email: user.email,
        });
      } else {
        // Senha inválida
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } else {
      // Credenciais inválidas
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);

    return response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Ver se o usuário existe no banco de dados
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Deletar o usuário
    await User.findByIdAndDelete(userId);

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Gerar token exclusivo
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Definir o token e a expiração no usuário
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token válido por 1 hora
    await user.save();

    // Enviar e-mail com o link de redefinição de senha
    const transporter = nodemailer.createTransport({
      // Configurações do seu serviço de e-mail (por exemplo, Gmail)
    });

    const mailOptions = {
      from: "seu-email@gmail.com",
      to: user.email,
      subject: "Recuperação de Senha",
      text:
        `Você está recebendo este e-mail porque solicitou a redefinição de senha para sua conta.\n\n` +
        `Clique no seguinte link ou cole-o em seu navegador para completar o processo:\n\n` +
        `http://${req.headers.host}/reset-password/${resetToken}\n\n` +
        `Se você não solicitou isso, ignore este e-mail e sua senha permanecerá inalterada.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "E-mail enviado com instruções para redefinição de senha",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
