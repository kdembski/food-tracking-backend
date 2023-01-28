import { Queries } from "@/base/queries/queries";
import { Field } from "@/base/queries/models/field";

export class MemberCalendarItemsQueries extends Queries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["item_id", "member_id"];
    const fieldsToUpdate = ["item_id", "member_id"];

    super({
      tableName: "member_calendar_items",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }

  getSelectByItemId() {
    return this.getSelectById({ id: "item_id" });
  }

  getSelectByMemberId() {
    return this.getSelectById({ id: "member_id" });
  }

  getDeleteByMemberIdAndItemId() {
    return "DELETE FROM member_calendar_items WHERE item_id = ? AND member_id = ?";
  }
}
