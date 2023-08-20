import { Database } from "@/config/database";

var getConnection = jest.fn();
jest.mock("mysql2", () => ({
  createPool: jest.fn().mockImplementation(() => ({
    getConnection,
  })),
}));

describe("Database Config", () => {
  let database: Database;

  beforeAll(() => {
    database = Database.getInstance();
  });

  it("Should reject promise if getConnection return error", async () => {
    getConnection.mockImplementation((callback: any) => {
      callback("error");
    });
    expect(async () => await database.sendQuery("query")).rejects.toEqual(
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
    expect(async () => await database.sendQuery("query")).rejects.toEqual(
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
    expect(database.sendQuery("query")).resolves.toEqual([
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
    expect(database.sendQuery("query")).resolves.toEqual({
      snakeCase: "value",
    });
    expect(connection.release).toHaveBeenCalledTimes(1);
  });
});
