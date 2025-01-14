var jwt = require("jsonwebtoken");
const JWT_SECRET = "Sarifisagoodb$oy";
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  console.log("Token received:", token);

  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log("Token data:", data);
    req.user = data.user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
