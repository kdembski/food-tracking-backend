import { ApiError } from "@/base/errors/models/apiError";
import { ShoppingItemDTO } from "@/dtos/shopping/shoppingItems";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { ShoppingItemsService } from "@/main/shopping/services/shoppingItems";
import { ShoppingItemsCollectionService } from "@/main/shopping/services/shoppingItemsCollection";
import { ShoppingItemValidator } from "@/main/shopping/validators/shoppingItem";
import { ShoppingItemMapper } from "@/mappers/shopping/shoppingItem";
import { ShoppingItemsCollectionMapper } from "@/mappers/shopping/shoppingItemsCollection";
import { Router } from "express";

const shoppingItemsRouter = Router();
const shoppingItemsService = new ShoppingItemsService();
const shoppingItemsCollectionService = new ShoppingItemsCollectionService();

shoppingItemsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const shoppingItem = await shoppingItemsService.getById(id);
    const dto = new ShoppingItemMapper().toDTO(shoppingItem);
    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.post("/", async (request, response) => {
  try {
    const data: ShoppingItemDTO = request.body;
    const shoppingItem = new ShoppingItemMapper().toDomain(data);
    new ShoppingItemValidator().validate(shoppingItem).throwErrors();

    const results = await shoppingItemsService.create(shoppingItem);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.post("/collection", async (request, response) => {
  try {
    const data: ShoppingItemDTO[] = request.body;
    const collection = new ShoppingItemsCollectionMapper().toDomain(data);

    const results = await shoppingItemsCollectionService.create(collection);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.post("/recipes", async (request, response) => {
  try {
    const {
      shoppingListId,
      recipeId,
      portions,
    }: { shoppingListId: number; recipeId: number; portions: number } =
      request.body;

    const results =
      await shoppingItemsCollectionService.createFromRecipeIngredients(
        shoppingListId,
        recipeId,
        portions
      );

    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: ShoppingItemDTO = request.body;
    data.id = id;

    const shoppingItem = new ShoppingItemMapper().toDomain(data);
    new ShoppingItemValidator().validate(shoppingItem).throwErrors();

    const results = await shoppingItemsService.update(shoppingItem);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.put("/:id/set-checked", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const isChecked: boolean = request.body?.isChecked;

    const results = await shoppingItemsService.updateIsChecked(id, isChecked);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.put("/:id/set-removed", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const isRemoved: boolean = request.body.isRemoved;

    const results = await shoppingItemsService.updateIsRemoved(id, isRemoved);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await shoppingItemsService.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.delete("/recipes/:id", async (request, response) => {
  try {
    const recipeId = new RequestParamsHelper(request.params).id;

    const results = await shoppingItemsService.deleteByRecipeId(recipeId);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default shoppingItemsRouter;
