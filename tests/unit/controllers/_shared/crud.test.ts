import { CRUDController } from "@/controllers/_shared/crud";
import { ApiError } from "@/_shared/errors/models/apiError";
import flushPromises from "flush-promises";

const ApiErrorSend = jest.fn();
jest.mock("@/_shared/errors/models/apiError", () => ({
  ApiError: jest.fn().mockImplementation(() => ({
    send: ApiErrorSend,
  })),
}));

const service = {
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

const mapper = {
  toDTO: jest.fn().mockImplementation((data: any) => data),
  toDomain: jest.fn().mockImplementation((data: any) => data),
};

const validator = {
  validate() {
    return this;
  },
  throwErrors: jest.fn(),
};

class TestController extends CRUDController<{}, {}, {}> {
  constructor() {
    super(service, mapper, validator);
  }
}

const response = {
  json: jest.fn(),
} as any;

describe("CRUD Controller", () => {
  let controller: TestController;

  beforeEach(() => {
    controller = new TestController();
    ApiError.create = jest
      .fn()
      .mockImplementation(() => new ApiError({ message: "error" }, response));
  });

  it("Should trigger service getById with correct id on successful getById call", async () => {
    const item = { test: "test" };
    const request = {
      params: { id: "1" },
    } as any;

    service.getById.mockImplementationOnce(() => Promise.resolve(item));
    await controller.getById(request, response);
    expect(service.getById).toHaveBeenLastCalledWith(1);
    expect(mapper.toDTO).toHaveBeenLastCalledWith(item);
    expect(response.json).toHaveBeenLastCalledWith(item);
  });

  it("Should send ApiError on failed getById call", async () => {
    const request = {
      params: { id: "1" },
    } as any;

    service.getById.mockImplementationOnce(() => Promise.reject("error"));
    await controller.getById(request, response);
    expect(ApiErrorSend).toHaveBeenCalledTimes(1);
  });

  it("Should trigger service create with correct data on successful create call", async () => {
    const item = { test: "test" };
    const request = {
      body: item,
    } as any;

    service.create.mockImplementationOnce(() => Promise.resolve("result"));
    await controller.create(request, response);
    expect(mapper.toDomain).toHaveBeenLastCalledWith(item);
    expect(validator.throwErrors).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenLastCalledWith(item);
    expect(response.json).toHaveBeenLastCalledWith("result");
  });

  it("Should send ApiError on failed create call", async () => {
    const item = { test: "test" };
    const request = {
      body: item,
    } as any;

    service.create.mockImplementationOnce(() => Promise.reject("error"));
    await controller.create(request, response);
    expect(ApiErrorSend).toHaveBeenCalledTimes(1);
  });

  it("Should trigger service update with correct data on successful update call", async () => {
    const item = { test: "test" };
    const request = {
      body: item,
    } as any;

    service.update.mockImplementationOnce(() => Promise.resolve("result"));
    await controller.update(request, response);
    expect(mapper.toDomain).toHaveBeenLastCalledWith(item);
    expect(validator.throwErrors).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenLastCalledWith(item);
    expect(response.json).toHaveBeenLastCalledWith("result");
  });

  it("Should send ApiError on failed update call", async () => {
    const item = { test: "test" };
    const request = {
      body: item,
    } as any;

    service.update.mockImplementationOnce(() => Promise.reject("error"));
    await controller.update(request, response);
    expect(ApiErrorSend).toHaveBeenCalledTimes(1);
  });

  it("Should trigger service delete with correct data on successful delete call", async () => {
    const request = {
      params: { id: "1" },
    } as any;

    service.delete.mockImplementationOnce(() => Promise.resolve("result"));
    await controller.delete(request, response);
    expect(service.delete).toHaveBeenLastCalledWith(1);
    expect(response.json).toHaveBeenLastCalledWith("result");
  });

  it("Should send ApiError on failed delete call", async () => {
    const request = {
      params: { id: "1" },
    } as any;

    service.delete.mockImplementationOnce(() => Promise.reject("error"));
    await controller.delete(request, response);
    expect(ApiErrorSend).toHaveBeenCalledTimes(1);
  });
});
