import { Field } from "../_shared/components/models/field";
import { Where } from "../_shared/components/models/where";
import { CRUDQueries } from "../_shared/crud";
import { DeleteQuery } from "../_shared/models/crud/delete";

export class MemberCalendarItemsQueries extends CRUDQueries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["item_id", "member_id"];
    const fieldsToUpdate = ["item_id", "member_id"];

    super(
      "member_calendar_items",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate
    );
  }

  getSelectByItemId() {
    return this.getSelectById("item_id");
  }

  getSelectByMemberId() {
    return this.getSelectById("member_id");
  }

  getDeleteByMemberIdAndItemId() {
    return new DeleteQuery(this.tableName, [
      new Where({ field: "item_id", equals: "?" }),
      new Where({ field: "member_id", equals: "?" }),
    ]).query;
  }
}
