import { ITags } from "@/interfaces/base/tags";
import { TagsConfig } from "@/types/base/tags";
import { Tag } from "./tag";

export abstract class Tags implements ITags {
  private _items?: Tag[];
  private _config?: TagsConfig;

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

  abstract getTags(config: TagsConfig): Promise<string[]>;

  getItemsDTO() {
    return this.items.map((item) => ({ name: item.name, count: item.count }));
  }
}
