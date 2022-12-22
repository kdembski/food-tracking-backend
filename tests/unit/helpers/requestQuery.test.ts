import { RequestQueryHelper } from "@/helpers/requestQuery";

describe("Request Query Helper", () => {
  it("Should parse size to number", () => {
    let helper = new RequestQueryHelper({});
    expect(helper.size).toEqual(10);

    helper = new RequestQueryHelper({ size: "20" });
    expect(helper.size).toEqual(20);
  });

  it("Should parse page to number", () => {
    let helper = new RequestQueryHelper({});
    expect(helper.page).toEqual(1);

    helper = new RequestQueryHelper({ page: "2" });
    expect(helper.page).toEqual(2);
  });

  it("Should transform sortAttribute to snake case", () => {
    let helper = new RequestQueryHelper({});
    expect(helper.sortAttribute).toEqual("");

    helper = new RequestQueryHelper({ sortAttribute: "sortAttribute" });
    expect(helper.sortAttribute).toEqual("sort_attribute");
  });

  it("Should return sortDirection", () => {
    let helper = new RequestQueryHelper({});
    expect(helper.sortDirection).toEqual("");

    helper = new RequestQueryHelper({ sortDirection: "asc" });
    expect(helper.sortDirection).toEqual("asc");
  });

  it("Should return searchPhrase with % signs", () => {
    let helper = new RequestQueryHelper({});
    expect(helper.searchPhrase).toEqual("%");

    helper = new RequestQueryHelper({ searchPhrase: "test" });
    expect(helper.searchPhrase).toEqual("%test%");
  });

  it("Should return tags", () => {
    let helper = new RequestQueryHelper({});
    expect(helper.tags).toEqual("");

    helper = new RequestQueryHelper({ tags: "tag" });
    expect(helper.tags).toEqual("tag");
  });

  it("Should return members as number arrays", () => {
    let helper = new RequestQueryHelper({});
    expect(helper.members).toEqual(undefined);

    helper = new RequestQueryHelper({ members: "1,2,3" });
    expect(helper.members).toEqual([1, 2, 3]);
  });

  it("Should parse fromDate to Date object", () => {
    let helper = new RequestQueryHelper({});
    expect(helper.fromDate).toEqual(undefined);

    helper = new RequestQueryHelper({
      fromDate: new Date(1970, 0, 0).getTime().toString(),
    });
    expect(helper.fromDate).toEqual(new Date(1970, 0, 0));
  });

  it("Should parse toDate to Date object", () => {
    let helper = new RequestQueryHelper({});
    expect(helper.toDate).toEqual(undefined);

    helper = new RequestQueryHelper({
      toDate: new Date(1970, 0, 0).getTime().toString(),
    });
    expect(helper.toDate).toEqual(new Date(1970, 0, 0));
  });
});
