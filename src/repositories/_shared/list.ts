import { Database } from "@/config/database";
import { IListRepository } from "@/interfaces/_shared/list/listRepository";
import { IListQueries } from "@/interfaces/_shared/queries/listQueries";
import { ListConfig } from "@/types/_shared/list";

export class ListRepository<QueryResult, Filters>
  implements IListRepository<QueryResult, Filters>
{
  protected database: Database;
  protected queries: IListQueries<Filters>;

  constructor(database: Database, queries: IListQueries<Filters>) {
    this.database = database;
    this.queries = queries;
  }

  async selectList(config: ListConfig<Filters>) {
    const query = this.queries.getSelectList(config);
    const data = await this.database.sendQuery(query);

    return data as QueryResult[];
  }

  async selectCount(filters: Filters) {
    const query = this.queries.getSelectCount(filters);
    const results = await this.database.sendQuery(query);

    return parseInt(results[0].count);
  }
}
