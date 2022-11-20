import Database from "../config/database.js";
import memberCalendarItemQueries from "../queries/member-calendar-item.js";
import MemberCalendarItem from "../models/member-calendar-item.js";

class MemberCalendarItemController {
  static getMemberCalendarItemByItemId(id) {
    return Database.sendQuery(memberCalendarItemQueries.selectByItemId, [id]);
  }

  static getMemberCalendarItemByMemberId(id) {
    return Database.sendQuery(memberCalendarItemQueries.selectByMemberId, [id]);
  }

  static addMemberCalendarItem(data) {
    const calendarMember = new MemberCalendarItem(data.itemId, data.memberId);
    return Database.sendQuery(
      memberCalendarItemQueries.insert,
      calendarMember.getValues()
    );
  }

  static updateMemberCalendarItemByItemId(itemId, memberId) {
    return Database.sendQuery(memberCalendarItemQueries.update, [
      memberId,
      itemId,
    ]);
  }

  static deleteMemberCalendarItem(id) {
    return Database.sendQuery(memberCalendarItemQueries.delete, [id]);
  }
}

export default MemberCalendarItemController;
