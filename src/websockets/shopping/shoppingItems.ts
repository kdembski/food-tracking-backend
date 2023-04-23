import { Server } from "http";
import { WebSocketService } from "../service";
import { WebSocket } from "ws";
import { ShoppingItemsCollectionController } from "@/main/shopping/controllers/shoppingItemsCollection";
import { ShoppingItemsCollectionMapper } from "@/mappers/shopping/shoppingItemsCollection";

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
      await new ShoppingItemsCollectionController().getNotRemovedByShoppingListId(
        listId
      );
    const dtos = new ShoppingItemsCollectionMapper().toDTO(items);

    ws.send(JSON.stringify({ listId, items: dtos }));
  }
}
