import { Server } from "http";
import { ShoppingItemsWebSocketService } from "./shopping/shoppingItems";

export class WebSocketsInitializer {
  execute(server: Server) {
    new ShoppingItemsWebSocketService(server).init();
  }
}
