import { Server } from "http";
import { ShoppingItemsWebSocketService } from "./shopping/shoppingItems";
import { ShoppingListsWebSocketService } from "./shopping/shoppingLists";

export class WebSocketsInitializer {
  execute(server: Server) {
    new ShoppingItemsWebSocketService(server).init();
    new ShoppingListsWebSocketService(server).init();
  }
}
