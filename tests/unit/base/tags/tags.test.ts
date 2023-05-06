import { TagsBuilder } from "@/base/tags/builders/tags";

const tagsData = ["tag1,tag2", "tag2,tag3"];
type Filters = {
  serachPhrase: string;
};

class TestRepository {
  selectTags(filters: Filters) {
    return Promise.resolve(tagsData);
  }
}

describe("Tags Model", () => {
  let builder: TagsBuilder<Filters>;

  beforeEach(() => {
    builder = new TagsBuilder(new TestRepository());
  });

  it("Should set sorted tags with count on loadTags method call", async () => {
    expect(builder.tags).toEqual([]);

    await builder.build({ serachPhrase: "test" });
    expect(builder.tags).toEqual([
      {
        _name: "tag2",
        _count: 2,
      },
      {
        _name: "tag1",
        _count: 1,
      },
      {
        _name: "tag3",
        _count: 1,
      },
    ]);
  });
});
