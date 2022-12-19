import { Response, Request, NextFunction } from "express";
import { TOKEN_INVALID, TOKEN_REQUIRED } from "@/consts/errorCodes";
import { UsersController } from "@/controllers/users";

export const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const publicPaths = ["/users/login"];
  if (publicPaths.includes(request.path)) {
    return next();
  }

  const token = request?.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return response.status(403).json({
      code: TOKEN_REQUIRED,
    });
  }

  const user = await new UsersController().getDefaultUser();
  if (token !== user.accessToken) {
    return response.status(401).json({ code: TOKEN_INVALID });
  }

  return next();
};
