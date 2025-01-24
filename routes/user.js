// routes.user.js         
const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup",async (req,res)=>{
 const {name,email,password}=req.body;
   if (!name || !email || !password) {
     return res.render("signup", {
       error: "All fields are required.",
     });
   }
 await User.create({
    name,
    email,
    password
 });
   return res.redirect("/");

});

router.post("/signin", async (req, res) => {
  const { name,email, password } = req.body;
    if (!name || !email || !password) {
      return res.render("signin", {
        error: "All fields are required.",
      });
    }
  try {
    const token = await User.matchPasswordAndGenerateToken(name,email, password);

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .redirect("/");
  } catch (error) {  
    return res.render("signin", {
        
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports=router;