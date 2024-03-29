import { Server } from "http";
import { WebSocketService } from "../service";
import { WebSocket } from "ws";
import { ShoppingItemsCollectionService } from "@/main/shopping/services/shoppingItemsCollection";
import { ShoppingItemsCollectionMapper } from "@/mappers/shopping/shoppingItemsCollection";

export class ShoppingItemsWebSocketService extends WebSocketService {
  private collectionService: ShoppingItemsCollectionService;
  private collectionMapper: ShoppingItemsCollectionMapper;

  constructor(
    server: Server,
    collectionService = new ShoppingItemsCollectionService(),
    collectionMapper = new ShoppingItemsCollectionMapper()
  ) {
    super(server, "/shopping/items");
    this.collectionService = collectionService;
    this.collectionMapper = collectionMapper;
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
    const items = await this.collectionService.getNotRemovedByShoppingListId(
      listId
    );
    const dtos = this.collectionMapper.toDTO(items);

    ws.send(JSON.stringify({ listId, items: dtos }));
  }
}
