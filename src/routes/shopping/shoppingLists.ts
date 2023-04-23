import { ApiError } from "@/base/errors/models/apiError";
import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { ShoppingItemsCollectionController } from "@/main/shopping/controllers/shoppingItemsCollection";
import { ShoppingListsController } from "@/main/shopping/controllers/shoppingLists";
import { ShoppingItemsCollectionMapper } from "@/mappers/shopping/shoppingItemsCollection";
import { ShoppingListMapper } from "@/mappers/shopping/shoppingList";
import { ShoppingListCollectionMapper } from "@/mappers/shopping/shoppingListCollection";
import { Router } from "express";

const shoppingListsRouter = Router();
const shoppingListsController = new ShoppingListsController();
const shoppingItemsCollectionController =
  new ShoppingItemsCollectionController();

shoppingListsRouter.get("/:id/items", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const shoppingItems =
      await shoppingItemsCollectionController.getNotRemovedByShoppingListId(id);
    const dtos = new ShoppingItemsCollectionMapper().toDTO(shoppingItems);

    response.json(dtos);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingListsRouter.get("/", async (request, response) => {
  try {
    const collection = await shoppingListsController.getAll();
    const dtos = new ShoppingListCollectionMapper().toDTO(collection);

    response.json(dtos);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingListsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const list = await shoppingListsController.getById(id);
    const dto = new ShoppingListMapper().toDTO(list);

    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingListsRouter.post("/", async (request, response) => {
  try {
    const data: ShoppingListDTO = request.body;
    const shoppingList = new ShoppingListMapper().toDomain(data);

    const results = await shoppingListsController.create(shoppingList);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingListsRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: ShoppingListDTO = request.body;
    data.id = id;

    const shoppingList = new ShoppingListMapper().toDomain(data);

    const results = await shoppingListsController.update(shoppingList);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingListsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await shoppingListsController.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingListsRouter.delete("/:id/items", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results =
      await shoppingItemsCollectionController.deleteByShoppingListId(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default shoppingListsRouter;
