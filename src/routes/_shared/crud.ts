import { CRUDController } from "@/controllers/_shared/crud";
import { Router } from "express";

export abstract class CRUDRoutesBuilder<Model, ModelDTO, QueryResult> {
  protected controller: CRUDController<Model, ModelDTO, QueryResult>;
  protected _router: Router;

  constructor(controller: CRUDController<Model, ModelDTO, QueryResult>) {
    this.controller = controller;
    this._router = Router();
  }

  build() {
    this.router.get("/:id", (req, res) => this.controller.getById(req, res));
    this.router.post("/", (req, res) => this.controller.create(req, res));
    this.router.put("/:id", (req, res) => this.controller.update(req, res));
    this.router.delete("/:id", (req, res) => this.controller.delete(req, res));
  }

  get router() {
    return this._router;
  }
}
