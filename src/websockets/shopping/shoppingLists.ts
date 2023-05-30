import { WebSocket } from "ws";
import { Server } from "http";
import { WebSocketService } from "../service";
import { ShoppingListsService } from "@/main/shopping/services/shoppingLists";
import { ShoppingListsCollectionMapper } from "@/mappers/shopping/shoppingListsCollection";

export class ShoppingListsWebSocketService extends WebSocketService {
  private service: ShoppingListsService;
  private collectionMapper: ShoppingListsCollectionMapper;

  constructor(
    server: Server,
    service = new ShoppingListsService(),
    collectionMapper = new ShoppingListsCollectionMapper()
  ) {
    super(server, "/shopping/lists");
    this.service = service;
    this.collectionMapper = collectionMapper;
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
    const collection = await this.service.getAll();
    const dtos = this.collectionMapper.toDTO(collection);

    ws.send(JSON.stringify({ lists: dtos }));
  }
}
