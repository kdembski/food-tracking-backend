import { FIELD_REQUIRED } from "../consts/error-codes.js";
import ApiError from "../config/api-error.js";

class CalendarMember {
  constructor(calendarId, memberId) {
    if (!calendarId) {
      throw new ApiError({
        code: FIELD_REQUIRED,
        message: "calendarId is required",
      });
    }

    if (!memberId) {
      throw new ApiError({
        code: FIELD_REQUIRED,
        message: "memberId is required",
      });
    }

    this.calendarId = calendarId;
    this.memberId = memberId;
  }

  getValues() {
    return [this.calendarId, this.memberId];
  }
}

export default CalendarMember;
