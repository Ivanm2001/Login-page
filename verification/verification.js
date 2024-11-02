import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function login(req, res, db) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ status: "Error", message: "Missing Data" });
  }

  try {
    let result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length <= 0) {
      return res.status(400).send({
        status: "Error",
        message: "An user with this email doesn't exist.",
      });
    }
    const data = result.rows[0];
    const db_password = data.password;

    if (db_password != password) {
      // I do it like this since I don't have to worry about incryption
      return res.status(400).send({
        status: "Error",
        message: "Password Missmatch.",
      });
    }

    let token = jsonwebtoken.sign({ email: email }, process.env.secret_phrase, {
      expiresIn: process.env.expires,
    });

    const cookieOption = {
      expires: new Date(
        Date.now() + process.env.cookie_expires * 24 * 60 * 60 * 1000
      ),
      path: "/",
    };

    res.cookie("jwt", token, cookieOption);
    return res
      .status(200)
      .send({ status: "ok", message: "User logged", redirect: "/main" });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: "An internal server error occurred. Please try again later.",
    });
  }
}

async function register(req, res, db) {
  const email = req.body.email;
  const password = req.body.password;
  const repeat_password = req.body.repeat_password;

  if (!email || !password || !repeat_password) {
    //Is any of the data null??
    return res.status(400).send({ status: "Error", message: "Missing data" });
  }

  if (password.length < 12) {
    return res.status(400).send({
      status: "Error",
      message: "La contraseña debe tener al menos 12 caracteres.",
    });
  }

  if (!/[A-Z]/.test(password)) {
    return res.status(400).send({
      status: "Error",
      message: "La contraseña debe tener al menos una letra mayúscula.",
    });
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return res.status(400).send({
      status: "Error",
      message: "La contraseña debe tener al menos un carácter especial.",
    });
  }

  if (password != repeat_password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Passwords don't match" });
  }

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]); //does this email already exist?
    if (result.rows.length > 0) {
      return res.status(400).send({
        status: "Error",
        message: "An user with this email already exists.",
      });
    }
  } catch (error) {
    console.error("Database query error:", error); // Log the error for debugging
    return res.status(500).send({
      status: "Error",
      message: "An internal server error occurred. Please try again later.",
    });
  }

  try {
    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      password,
    ]);
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: "An internal server error occurred. Please try again later.",
    });
  }

  return res.status(201).send({
    status: "Succesfull",
    message: `the email ${email} was added.`,
    redirect: "/",
  });
}

export const methods = {
  login,
  register,
};
