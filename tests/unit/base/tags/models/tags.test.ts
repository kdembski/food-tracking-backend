import { TagsConfig } from "@/interfaces/base/tags";
import { TagsBuilder } from "@/base/tags/builders/tags";
import { Tags } from "@/base/tags/models/tags";

const tagsData = ["tag1,tag2", "tag2,tag3"];

class TestTags extends Tags {
  getTags(config: TagsConfig) {
    return Promise.resolve(tagsData);
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
    expect(tags.getItemsDTO()).toEqual([
      {
        name: "tag2",
        count: 2,
      },
      {
        name: "tag1",
        count: 1,
      },
      {
        name: "tag3",
        count: 1,
      },
    ]);
  });
});
