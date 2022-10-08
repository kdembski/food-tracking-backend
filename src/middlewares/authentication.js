import Database from "../config/database.js";
import userModel from "../models/user.js";

const verifyToken = async (request, response, next) => {
  const publicPaths = ["/login"];
  if (publicPaths.includes(request.path)) {
    return next();
  }

  const token = request?.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return response.status(403).json({
      code: "TOKEN_REQUIRED",
    });
  }

  const results = await Database.sendQuery(userModel.selectUser);
  if (token !== results[0].access_token) {
    return response.status(401).json({ code: "TOKEN_INVALID" });
  }

  return next();
};

export default verifyToken;
