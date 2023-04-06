import { Server } from "http";
import { ShoppingItemsWebSocketService } from "./shopping/items";

export class WebSocketsInitializer {
  execute(server: Server) {
    new ShoppingItemsWebSocketService(server).init();
  }
}
