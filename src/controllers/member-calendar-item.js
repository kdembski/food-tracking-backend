import Database from "../config/database.js";
import memberCalendarItemQueries from "../queries/member-calendar-item.js";
import MemberCalendarItem from "../models/member-calendar-item.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class MemberCalendarItemController {
  static getMemberCalendarItemsByItemId(id) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(memberCalendarItemQueries.selectByItemId, [id])
        .then((results) => resolve(convertKeysToCamelCase(results)))
        .catch((error) => reject(error));
    });
  }

  static getMemberCalendarItemsByMemberId(id) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(memberCalendarItemQueries.selectByMemberId, [id])
        .then((results) => resolve(convertKeysToCamelCase(results)))
        .catch((error) => reject(error));
    });
  }

  static addMemberCalendarItem(data) {
    const calendarMember = new MemberCalendarItem(data.itemId, data.memberId);
    return Database.sendQuery(
      memberCalendarItemQueries.insert,
      calendarMember.getValues()
    );
  }

  static deleteMemberCalendarItem(id) {
    return Database.sendQuery(memberCalendarItemQueries.delete, [id]);
  }

  static deleteMemberCalendarItemByMemberIdAndItemId(itemId, memberId) {
    return Database.sendQuery(
      memberCalendarItemQueries.deleteByItemIdAndMemberId,
      [itemId, memberId]
    );
  }
}

export default MemberCalendarItemController;
