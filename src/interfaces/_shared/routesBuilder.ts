import { Router } from "express";

export interface IRoutesBuilder {
  readonly path: string;
  build(): void;
  get router(): Router;
}
