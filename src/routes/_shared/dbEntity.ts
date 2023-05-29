import { DbEntityController } from "@/controllers/_shared/dbEntity";
import { Router } from "express";

export abstract class DbEntityRoutesBuilder<Model, ModelDTO, QueryResult> {
  protected controller: DbEntityController<Model, ModelDTO, QueryResult>;
  protected _router: Router;

  constructor(controller: DbEntityController<Model, ModelDTO, QueryResult>) {
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
