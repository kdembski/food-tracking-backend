import { ITagsRepository } from "@/interfaces/base/tags";
import { TagsConfig } from "@/types/base/tags";
import { Tag } from "./tag";

export abstract class Tags {
  private _items?: Tag[];
  private _config?: TagsConfig;
  private repository: ITagsRepository;

  constructor(repository: ITagsRepository) {
    this.repository = repository;
  }

  get items() {
    return this._items || [];
  }

  get config() {
    if (!this._config) {
      throw Error("Tags config is missing");
    }
    return this._config;
  }

  set items(value) {
    this._items = value;
  }

  set config(value) {
    this._config = value;
  }

  getTags(config: TagsConfig): Promise<string[]> {
    return this.repository.selectTags(config);
  }
}
