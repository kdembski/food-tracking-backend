import { UsersController } from "@/controllers/users";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";
import { Router } from "express";

export class UsersRoutesBuilder implements IRoutesBuilder {
  private controller: UsersController;
  private _router: Router;
  readonly path = "/users";

  constructor(controller = new UsersController()) {
    this.controller = controller;
    this._router = Router();
  }

  build() {
    this.router.post("/login", (req, res) => this.controller.login(req, res));
  }

  get router() {
    return this._router;
  }
}
