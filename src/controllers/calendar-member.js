import Database from "../config/database.js";
import calendarMembersQueries from "../queries/calendar-member.js";
import CalendarMember from "../models/calendar-member.js";

class CalendarMemberController {
  static getCalendarMemberByCalendarId(id) {
    return Database.sendQuery(calendarMembersQueries.selectByCalendarId, [id]);
  }

  static getCalendarMemberByMemberId(id) {
    return Database.sendQuery(calendarMembersQueries.selectByMemberId, [id]);
  }

  static addCalendarMember(data) {
    const calendarMember = new CalendarMember(data.calendarId, data.memberId);
    return Database.sendQuery(
      calendarMembersQueries.insert,
      calendarMember.getValues()
    );
  }

  static updateCalendarMember(id, data) {
    const calendarMember = new CalendarMember(data.calendarId, data.memberId);
    return Database.sendQuery(calendarMembersQueries.update, [
      ...calendarMember.getValues(),
      id,
    ]);
  }

  static deleteCalendarMember(id) {
    return Database.sendQuery(calendarMembersQueries.delete, [id]);
  }
}

export default IngredientWithUnitController;
