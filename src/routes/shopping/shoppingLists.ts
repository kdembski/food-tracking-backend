import { ApiError } from "@/base/errors/models/apiError";
import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { ShoppingItemsController } from "@/main/shopping/controllers/shoppingItems";
import { ShoppingListsController } from "@/main/shopping/controllers/shoppingLists";
import { ShoppingItemMapper } from "@/mappers/shopping/shoppingItem";
import { ShoppingListMapper } from "@/mappers/shopping/shoppingList";
import { Router } from "express";

const shoppingListsRouter = Router();
const shoppingListsController = new ShoppingListsController();
const shoppingItemsController = new ShoppingItemsController();

shoppingListsRouter.get("/:id/items", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const shoppingItems =
      await shoppingItemsController.getNotRemovedByShoppingListId(id);
    const dto = shoppingItems.map((shoppingItem) =>
      new ShoppingItemMapper().toDTO(shoppingItem)
    );

    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingListsRouter.get("/", async (request, response) => {
  try {
    const shoppingLists = await shoppingListsController.getAll();
    const dtos = shoppingLists.map((list) =>
      new ShoppingListMapper().toDTO(list)
    );

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

    const results = await shoppingListsController.deleteItems(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default shoppingListsRouter;
