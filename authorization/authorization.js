import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function goToMain(req, res, db, next) {
  const logged_in = await checkCookie(req, db);
  if (logged_in) return next();
  return res.redirect("/");
}

async function amILoggedIn(req, res, db, next) {
  const logged_in = await checkCookie(req, db);
  if (!logged_in) return next();
  return res.redirect("/main");
}

async function checkCookie(req, db) {
  try {
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    const decoded = jsonwebtoken.verify(cookieJWT, process.env.secret_phrase);
    const email = decoded.email;
    try {
      let result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (result.rows.length <= 0) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return res.status(500).send({
        status: "Error",
        message: "An internal server error occurred. Please try again later.",
      });
    }
  } catch (error) {
    return false;
  }
}

export const methods = {
  goToMain,
  amILoggedIn,
};
