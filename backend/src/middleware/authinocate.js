const { verifyToken } = require("..//util/token");

module.exports = async (req, res, next) => {
  try {
    if (!req?.headers?.authorization)
      return res.status(401).send("please provide authorization token");
    const bearerToken = req?.headers?.authorization;
    if (!bearerToken.startsWith("Bearer"))
      return res.status(401).send("please provide bearer token");
    const token = bearerToken.split(" ")[1];
    let user;
    user = await verifyToken(token);
    req.user=user.user
    
    next()
  } catch (err) {
    
    return res.status("400").send("Invalid token");
  }
};
