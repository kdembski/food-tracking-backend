import { WebSocket } from "ws";
import { Server } from "http";
import { WebSocketService } from "../service";
import { ShoppingListsService } from "@/main/shopping/services/shoppingLists";
import { ShoppingListsCollectionMapper } from "@/mappers/shopping/shoppingListsCollection";

export class ShoppingListsWebSocketService extends WebSocketService {
  constructor(server: Server) {
    super(server, "/shopping/lists");
  }

  init() {
    super.init();

    this.webSocketServer.on("connection", (ws) => {
      ws.on("message", () => {
        this.webSocketServer.clients.forEach((client) => {
          if (client.readyState !== WebSocket.OPEN) {
            return;
          }

          this.onMessage(client);
        });
      });
    });
  }

  private async onMessage(ws: WebSocket) {
    const collection = await new ShoppingListsService().getAll();
    const dtos = new ShoppingListsCollectionMapper().toDTO(collection);

    ws.send(JSON.stringify({ lists: dtos }));
  }
}
