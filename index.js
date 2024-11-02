import express from "express";
import cookieParser from "cookie-parser";
import pg from "pg";
import dotenv from "dotenv";
import { methods as verification_functions } from "./verification/verification.js";
import { methods as authorization } from "./authorization/authorization.js";

//Server
const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());

//Server Configuration
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

dotenv.config();

//Database setup
const db = new pg.Client({
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_database,
  password: process.env.db_password,
  port: parseInt(process.env.db_port, 10),
});

//connect to database
db.connect();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get(
  "/",
  (req, res, next) => {
    authorization.amILoggedIn(req, res, db, next);
  },
  (req, res) => {
    res.render("login.ejs");
  }
);

app.get(
  "/register",
  (req, res, next) => {
    authorization.amILoggedIn(req, res, db, next);
  },
  (req, res) => {
    res.render("register.ejs");
  }
);

app.get(
  "/main",
  (req, res, next) => {
    authorization.goToMain(req, res, db, next);
  },
  (req, res) => {
    res.render("main.ejs");
  }
);

app.post("/api/register", (req, res) =>
  verification_functions.register(req, res, db)
);

app.post("/api/login", (req, res) =>
  verification_functions.login(req, res, db)
);

app.get(
  "/",
  (req, res, next) => {
    authorization.soloPublico(req, res, db, next);
  },
  (req, res) => {
    res.render("main.ejs");
  }
);
