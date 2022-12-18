import { Tags } from "@/abstract/models/tags";

const tagsData = ["tag1,tag2", "tag2,tag3"];

class TestTags extends Tags {
  protected getTags(searchPhrase: string, tags?: string) {
    return Promise.resolve(tagsData);
  }
}

describe("Tags Model", () => {
  let tags: TestTags;

  beforeEach(() => {
    tags = new TestTags();
  });

  it("Should set sorted tags with count on loadTags method call", async () => {
    expect(tags.tags).toEqual([]);

    await tags.loadTags({});
    expect(tags.tags).toEqual([
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
