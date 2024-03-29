import { OkPacket } from "mysql2";
import { CustomError } from "@/_shared/errors/models/customError";
import { Database } from "@/config/database";
import { ICRUDRepository } from "@/interfaces/_shared/crud/crudRepository";
import { CRUDQueries } from "@/queries/_shared/crud";

export abstract class CRUDRepository<Model, QueryResult>
  implements ICRUDRepository<Model, QueryResult>
{
  protected database: Database;
  protected queries: CRUDQueries;

  constructor(database: Database, queries: CRUDQueries) {
    this.database = database;
    this.queries = queries;
  }

  abstract getFieldsToInsert(model: Model): unknown[];
  abstract getFieldsToUpdate(model: Model): unknown[];

  async selectById(id: number) {
    const query = this.queries.getSelectById();
    const results = await this.database.sendQuery(query, [id]);
    const dto = results[0] as QueryResult;

    if (!dto) {
      throw new CustomError({
        message: "Record with id: '" + id + "' does not exists",
      });
    }

    return dto;
  }

  async insert(model: Model) {
    const query = this.queries.getInsert();
    const fields = this.getFieldsToUpdate(model);
    const results = await this.database.sendQuery(query, fields);

    return results as OkPacket;
  }

  async update(model: Model) {
    const query = this.queries.getUpdate();
    const fields = this.getFieldsToUpdate(model);
    const results = await this.database.sendQuery(query, fields);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = this.queries.getDelete();
    const results = await this.database.sendQuery(query, [id]);

    return results as OkPacket;
  }
}
