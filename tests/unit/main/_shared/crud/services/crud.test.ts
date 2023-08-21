import { CRUDService } from "@/main/_shared/crud/services/crud";

class TestService extends CRUDService<{}, {}> {}

const repository = {
  selectById: jest.fn().mockImplementation(() => "select by id"),
  insert: jest.fn().mockImplementation(() => "insert"),
  update: jest.fn().mockImplementation(() => "update"),
  delete: jest.fn().mockImplementation(() => "delete"),
} as any;

const mapper = {
  toDomain: jest.fn(),
};

describe("CRUD Service", () => {
  let service: TestService;

  beforeEach(() => {
    service = new TestService(repository, mapper);
  });

  it("Should trigger repository selectById on getById call", async () => {
    await service.getById(1);
    expect(repository.selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await service.create(1);
    expect(repository.insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await service.update(1);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository delete on delete call", async () => {
    await service.delete(1);
    expect(repository.delete).toHaveBeenCalledTimes(1);
  });
});
