import { RequestParamsHelper } from "@/helpers/requestParams";

describe("Request Params Helper", () => {
  it("Should throw error if id param is invalid", async () => {
    const helper = new RequestParamsHelper({ id: "invalid" });
    expect(() => helper.id).toThrowError();
  });

  it("Should return id param if valid", async () => {
    const helper = new RequestParamsHelper({ id: "1" });
    expect(helper.id).toEqual(1);
  });
});
