import { RequestQueryData } from "@/types/helpers/requestQuery";
import loadsh from "lodash";

export class RequestQueryHelper {
  private _size?: string;
  private _page?: string;
  private _sortAttribute?: string;
  private _sortDirection?: string;
  private _searchPhrase?: string;
  private _tags?: string;
  private _members?: string;
  private _fromDate?: string;
  private _toDate?: string;
  private _ingredientIds?: string;

  constructor(query: RequestQueryData) {
    this._size = query.size;
    this._page = query.page;
    this._sortAttribute = query.sortAttribute;
    this._sortDirection = query.sortDirection;
    this._searchPhrase = query.searchPhrase;
    this._tags = query.tags;
    this._members = query.members;
    this._fromDate = query.fromDate;
    this._toDate = query.toDate;
    this._ingredientIds = query.ingredientIds;
  }

  get size() {
    return parseInt(this._size || "10");
  }

  get page() {
    return parseInt(this._page || "1");
  }

  get sortAttribute() {
    return loadsh.snakeCase(this._sortAttribute) || "";
  }

  get sortDirection() {
    return this._sortDirection || "";
  }

  get searchPhrase() {
    return this._searchPhrase || "";
  }

  get tags() {
    return this._tags?.split(",") || [];
  }

  get members() {
    return this._members?.split(",").map((id) => parseInt(id)) || [];
  }

  get fromDate() {
    return this._fromDate ? new Date(parseInt(this._fromDate)) : undefined;
  }

  get toDate() {
    return this._toDate ? new Date(parseInt(this._toDate)) : undefined;
  }

  get ingredientIds() {
    return this._ingredientIds?.split(",").map((id) => parseInt(id)) || [];
  }
}
