// services/authentication.js      
const JWT = require("jsonwebtoken");

const secret = process.env.JWT_secret;

function createTokenForUser(user)
{
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = JWT.sign(payload, secret, { expiresIn: "1h" });  

  return token;
}

function validateToken(token) {
  try {
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}


module.exports = {
  createTokenForUser,
  validateToken,
};