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
    super.init();

    this.webSocketServer.on("connection", (ws) => {
      ws.on("message", (data) => {
        const { listId, returnToSender } = JSON.parse(data.toString());

        this.webSocketServer.clients.forEach((client) => {
          if (client === ws && !returnToSender) {
            return;
          }

          if (client.readyState !== WebSocket.OPEN) {
            return;
          }

          this.onMessage(listId, client);
        });
      });
    });
  }

  private async onMessage(listId: number, ws: WebSocket) {
    const items =
      await new ShoppingItemsController().getNotRemovedByShoppingListId(listId);
    const dtos = items.map((item) => new ShoppingItemMapper().toDTO(item));

    ws.send(JSON.stringify({ listId, items: dtos }));
  }
}
