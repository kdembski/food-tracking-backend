import { ShoppingItemDTO } from "@/dtos/shopping/shoppingItems";
import { IShoppingItem } from "@/interfaces/shopping/shopping-lists/shoppingList";

export class ShoppingItem implements IShoppingItem {
  private _id?: number;
  private _shoppingListId?: number;
  private _recipeId?: number;
  private _ingredientUnitId?: number;
  private _ingredientId?: number;
  private _customItemId?: number;
  private _amount?: number;
  private _isChecked?: boolean;
  private _checkedAt?: Date;
  private _isRemoved?: boolean;
  private _ingredientName?: string;
  private _unitShortcut?: string;
  private _customItemName?: string;
  private _ingredientCategoryId?: number;
  private _isPrimary?: boolean;
  private _converterToPrimary?: number;

  get id() {
    return this._id;
  }

  get shoppingListId() {
    return this._shoppingListId;
  }

  get recipeId() {
    return this._recipeId;
  }

  get ingredientUnitId() {
    return this._ingredientUnitId;
  }

  get ingredientId() {
    return this._ingredientId;
  }

  get customItemId() {
    return this._customItemId;
  }

  get amount() {
    return this._amount;
  }

  get ingredientName() {
    return this._ingredientName;
  }

  get unitShortcut() {
    return this._unitShortcut;
  }

  get customItemName() {
    return this._customItemName;
  }

  get isChecked() {
    return this._isChecked;
  }

  get checkedAt() {
    return this._checkedAt;
  }

  get isRemoved() {
    return this._isRemoved;
  }

  get ingredientCategoryId() {
    return this._ingredientCategoryId;
  }

  get isPrimary() {
    return this._isPrimary;
  }

  get converterToPrimary() {
    return this._converterToPrimary;
  }

  set id(value) {
    this._id = value;
  }

  set recipeId(value) {
    this._recipeId = value;
  }

  set ingredientUnitId(value) {
    this._ingredientUnitId = value;
  }

  set ingredientId(value) {
    this._ingredientId = value;
  }

  set shoppingListId(value) {
    this._shoppingListId = value;
  }

  set customItemId(value) {
    this._customItemId = value;
  }

  set amount(value) {
    this._amount = value;
  }

  set ingredientName(value) {
    this._ingredientName = value;
  }

  set unitShortcut(value) {
    this._unitShortcut = value;
  }

  set customItemName(value) {
    this._customItemName = value;
  }

  set isChecked(value) {
    this._isChecked = value;
  }

  set checkedAt(value) {
    this._checkedAt = value;
  }

  set isRemoved(value) {
    this._isRemoved = value;
  }

  set ingredientCategoryId(value) {
    this._ingredientCategoryId = value;
  }

  set isPrimary(value) {
    this._isPrimary = value;
  }

  set converterToPrimary(value) {
    this._converterToPrimary = value;
  }

  constructor(data: ShoppingItemDTO) {
    this._id = data.id;
    this._recipeId = data.recipeId;
    this._ingredientUnitId = data.ingredientUnitId;
    this._ingredientId = data.ingredientId;
    this._shoppingListId = data.shoppingListId;
    this._customItemId = data.customItemId;
    this._amount = data.amount;
    this._ingredientName = data.ingredientName;
    this._unitShortcut = data.unitShortcut;
    this._customItemName = data.customItemName;
    this._isChecked = data.isChecked;
    this.checkedAt = data.checkedAt;
    this._isRemoved = data.isRemoved;
    this._ingredientCategoryId = data.ingredientCategoryId;
    this._isPrimary = data.isPrimary;
    this._converterToPrimary = data.converterToPrimary;
  }
}
