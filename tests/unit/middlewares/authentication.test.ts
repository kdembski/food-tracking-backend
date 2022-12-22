import { TOKEN_INVALID, TOKEN_REQUIRED } from "@/consts/errorCodes";
import { verifyToken } from "@/middlewares/authentication";
import { NextFunction, Request, Response } from "express";

const getDefaultUser = jest.fn().mockImplementation(() => ({
  accessToken: "testToken",
}));
jest.mock("@/controllers/users", () => ({
  UsersController: jest.fn().mockImplementation(() => ({
    getDefaultUser,
  })),
}));

describe("Authentication Middleware", () => {
  it("Should skip auth if trigger on public path", () => {
    const request = {
      path: "/users/login",
    } as Request;
    const response = {} as Response;
    const next = jest.fn() as NextFunction;

    verifyToken(request, response, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("Should send TOKEN_REQUIRED if token in request header is missing", () => {
    const request = {
      headers: {},
    } as Request;

    const json = jest.fn();
    const response = {
      status: jest.fn(() => ({
        json,
      })),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    verifyToken(request, response, next);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(403);
    expect(json).toHaveBeenCalledWith({ code: TOKEN_REQUIRED });
  });

  it("Should send TOKEN_INVALID if token is different than user accesssToken", async () => {
    const request = {
      headers: {
        authorization: "Bearer invalidToken",
      },
    } as Request;

    const json = jest.fn();
    const response = {
      status: jest.fn(() => ({
        json,
      })),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    await verifyToken(request, response, next);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ code: TOKEN_INVALID });
  });

  it("Should call next function if auth pass", async () => {
    const request = {
      headers: {
        authorization: "Bearer testToken",
      },
    } as Request;
    const response = {} as Response;
    const next = jest.fn() as NextFunction;

    await verifyToken(request, response, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
