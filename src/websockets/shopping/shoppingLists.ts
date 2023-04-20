import { Server } from "http";
import { WebSocketService } from "../service";
import { WebSocket } from "ws";
import { ShoppingListsController } from "@/main/shopping/controllers/shoppingLists";
import { ShoppingListMapper } from "@/mappers/shopping/shoppingList";

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
    const lists = await new ShoppingListsController().getAll();
    const dtos = lists.map((list) => new ShoppingListMapper().toDTO(list));

    ws.send(JSON.stringify({ lists: dtos }));
  }
}
