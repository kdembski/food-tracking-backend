import { Router } from "express";
import { verifyToken } from "@/middlewares/authentication";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class RoutesBuilder {
  private subRoutesBuilders: IRoutesBuilder[];
  private _router: Router;

  constructor(subRoutesBuilders: IRoutesBuilder[]) {
    this.subRoutesBuilders = subRoutesBuilders;
    this._router = Router();
  }

  build() {
    this.router.all("*", verifyToken);
    this.subRoutesBuilders.forEach((subRoutesBuilder) => {
      subRoutesBuilder.build();
      this.router.use(subRoutesBuilder.path, subRoutesBuilder.router);
    });
  }

  get router() {
    return this._router;
  }
}
