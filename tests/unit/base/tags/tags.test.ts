import { TagsConfig } from "@/types/base/tags";
import { TagsBuilder } from "@/base/tags/builders/tags";
import { Tags } from "@/base/tags/models/tags";

const tagsData = ["tag1,tag2", "tag2,tag3"];

class TestRepository {
  selectTags(config: TagsConfig) {
    return Promise.resolve(tagsData);
  }
}

class TestTags extends Tags {
  constructor() {
    super(new TestRepository());
  }
}

describe("Tags Model", () => {
  let tags: TestTags;
  let builder: TagsBuilder;

  beforeEach(() => {
    tags = new TestTags();
    builder = new TagsBuilder(tags);
  });

  it("Should set sorted tags with count on loadTags method call", async () => {
    expect(tags.items).toEqual([]);

    await builder.build({});
    expect(tags.items).toEqual([
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
