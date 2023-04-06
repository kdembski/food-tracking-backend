import { Server } from "http";
import { WebSocketService } from "../service";
import { RawData, WebSocket } from "ws";
import { ShoppingItemsController } from "@/main/shopping/controllers/shoppingItems";
import { ShoppingItemMapper } from "@/mappers/shopping/shoppingItem";

export class ShoppingItemsWebSocketService extends WebSocketService {
  constructor(server: Server) {
    super(server, "/shopping/items");
  }

  init() {
    this.webSocketServer.on("connection", (ws) => {
      ws.on("error", console.error);

      ws.on("message", (data) => {
        this.webSocketServer.clients.forEach((client) => {
          if (client.readyState !== WebSocket.OPEN) {
            return;
          }
          this.onMessage(data, client);
        });
      });
    });
  }

  async onMessage(data: RawData, ws: WebSocket) {
    const shoppingListId = parseInt(data.toString());
    const items =
      await new ShoppingItemsController().getNotRemovedByShoppingListId(
        shoppingListId
      );
    const dtos = items.map((item) => new ShoppingItemMapper().toDTO(item));

    ws.send(JSON.stringify({ listId: shoppingListId, items: dtos }));
  }
}
