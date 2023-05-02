import { RequestParamsHelper } from "@/helpers/requestParams";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { ShoppingCustomItemMapper } from "@/mappers/shopping/shoppingCustomItem";
import { ShoppingCustomItemDTO } from "@/dtos/shopping/shoppingCustomItems";
import { ShoppingCustomItem } from "@/main/shopping/models/shoppingCustomItem";
import { ShoppingCustomItemsController } from "@/main/shopping/controllers/shoppingCustomItems";
import { ShoppingCustomItemValidator } from "@/main/shopping/validators/shoppingCustomItem";

const shoppingCustomItemsRouter = Router();
const shoppingCustomItemsController = new ShoppingCustomItemsController();

shoppingCustomItemsRouter.get("/options", async (request, response) => {
  try {
    const options = await shoppingCustomItemsController.getOptions();
    response.json(options);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingCustomItemsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const item = await shoppingCustomItemsController.getById(id);
    const dto = new ShoppingCustomItemMapper().toDTO(item);
    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingCustomItemsRouter.post("/", async (request, response) => {
  try {
    const data: ShoppingCustomItemDTO = request.body;
    const item = new ShoppingCustomItem(data);
    new ShoppingCustomItemValidator().validate(item).throwErrors();

    const results = await shoppingCustomItemsController.create(item);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingCustomItemsRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: ShoppingCustomItemDTO = request.body;
    data.id = id;
    const item = new ShoppingCustomItem(data);
    new ShoppingCustomItemValidator().validate(item).throwErrors();

    const results = await shoppingCustomItemsController.update(item);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingCustomItemsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await shoppingCustomItemsController.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default shoppingCustomItemsRouter;
