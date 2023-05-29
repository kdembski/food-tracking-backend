import { MembersController } from "@/controllers/members";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";
import { Router } from "express";

export class MembersRoutesBuilder implements IRoutesBuilder {
  private controller: MembersController;
  private _router: Router;
  readonly path = "/members";

  constructor(controller = new MembersController()) {
    this.controller = controller;
    this._router = Router();
  }

  build() {
    this.router.get("/", (req, res) => this.controller.getAll(req, res));
  }

  get router() {
    return this._router;
  }
}
