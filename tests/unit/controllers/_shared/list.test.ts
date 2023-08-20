import { ApiError } from "@/_shared/errors/models/apiError";
import { ListController } from "@/controllers/_shared/list";

const ApiErrorSend = jest.fn();
jest.mock("@/_shared/errors/models/apiError", () => ({
  ApiError: jest.fn().mockImplementation(() => ({
    send: ApiErrorSend,
  })),
}));

const service = {
  getList: jest.fn(),
  getCount: jest.fn(),
} as any;

const mapper = {
  toDTO: jest.fn().mockImplementation((data: any) => data),
} as any;

class TestListController extends ListController<{}, {}, {}, {}> {
  constructor() {
    super(service, mapper);
  }
}

const response = {
  json: jest.fn(),
} as any;

describe("List Controller", () => {
  let controller: TestListController;

  beforeEach(() => {
    controller = new TestListController();
    ApiError.create = jest
      .fn()
      .mockImplementation(() => new ApiError({ message: "error" }, response));
  });

  it("Should trigger service getList with correct id on successful getList call", async () => {
    const list = [{ test: "test" }];
    const request = {
      query: { test: "test" },
    } as any;

    service.getList.mockImplementationOnce(() => Promise.resolve(list));
    await controller.getList(request, response);
    expect(service.getList).toHaveBeenLastCalledWith(request.query);
    expect(mapper.toDTO).toHaveBeenLastCalledWith(list);
    expect(response.json).toHaveBeenLastCalledWith(list);
  });

  it("Should send ApiError on failed getList call", async () => {
    const request = {
      query: { test: "test" },
    } as any;

    service.getList.mockImplementationOnce(() => Promise.reject("error"));
    await controller.getList(request, response);
    expect(ApiErrorSend).toHaveBeenCalledTimes(1);
  });

  it("Should trigger service getCount with correct id on successful getCount call", async () => {
    const request = {
      query: { test: "test" },
    } as any;

    service.getCount.mockImplementationOnce(() => Promise.resolve(1));
    await controller.getCount(request, response);
    expect(service.getCount).toHaveBeenLastCalledWith(request.query);
    expect(response.json).toHaveBeenLastCalledWith(1);
  });

  it("Should send ApiError on failed getCount call", async () => {
    const request = {
      query: { test: "test" },
    } as any;

    service.getCount.mockImplementationOnce(() => Promise.reject("error"));
    await controller.getCount(request, response);
    expect(ApiErrorSend).toHaveBeenCalledTimes(1);
  });
});
