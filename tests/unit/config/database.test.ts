var getConnection = jest.fn();
var createPool = jest.fn().mockImplementation(() => ({
  getConnection,
}));
import Database from "@/config/database";

jest.mock("mysql2", () => ({
  createPool,
}));

describe("Database Config", () => {
  beforeAll(() => {
    Database.initializeConnectionPool();
  });

  it("Should set pool on db init and allow it only once", async () => {
    expect(() => Database.initializeConnectionPool()).toThrowError();
  });

  it("Should reject promise if getConnection return error", async () => {
    getConnection.mockImplementation((callback: any) => {
      callback("error");
    });
    expect(async () => await Database.sendQuery("query")).rejects.toEqual(
      "error"
    );
  });

  it("Should reject promise if sended query return error", async () => {
    const connection = {
      query: jest
        .fn()
        .mockImplementation(
          (query: string, params: Array<any>, callback: any) => {
            callback("error");
          }
        ),
      release: jest.fn(),
    };
    getConnection.mockImplementation((callback: any) => {
      callback(null, connection);
    });
    expect(async () => await Database.sendQuery("query")).rejects.toEqual(
      "error"
    );
    expect(connection.release).toHaveBeenCalledTimes(1);
  });

  it("Should resolve camelCased objects array if connection query return results array", async () => {
    const connection = {
      query: jest
        .fn()
        .mockImplementation(
          (query: string, params: Array<any>, callback: any) => {
            callback(null, [{ snake_case: "value" }]);
          }
        ),
      release: jest.fn(),
    };
    getConnection.mockImplementation((callback: any) => {
      callback(null, connection);
    });
    expect(Database.sendQuery("query")).resolves.toEqual([
      { snakeCase: "value" },
    ]);
    expect(connection.release).toHaveBeenCalledTimes(1);
  });

  it("Should resolve camelCased objects if connection query return results object", async () => {
    const connection = {
      query: jest
        .fn()
        .mockImplementation(
          (query: string, params: Array<any>, callback: any) => {
            callback(null, { snake_case: "value" });
          }
        ),
      release: jest.fn(),
    };
    getConnection.mockImplementation((callback: any) => {
      callback(null, connection);
    });
    expect(Database.sendQuery("query")).resolves.toEqual({
      snakeCase: "value",
    });
    expect(connection.release).toHaveBeenCalledTimes(1);
  });
});
