import { parse } from "url";
import { WebSocketServer } from "ws";
import { Server } from "http";

export class WebSocketService {
  protected webSocketServer: WebSocketServer;

  constructor(server: Server, route: string) {
    const webSocketServer = new WebSocketServer({ noServer: true });
    this.webSocketServer = webSocketServer;

    server.on("upgrade", function upgrade(request, socket, head) {
      const { pathname } = parse(request.url || "");

      if (pathname !== route) {
        return;
      }
      webSocketServer.handleUpgrade(request, socket, head, function done(ws) {
        webSocketServer.emit("connection", ws, request);
      });
    });
  }
}
