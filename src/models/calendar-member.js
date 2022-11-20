class CalendarMember {
  constructor(calendarId, memberId) {
    this.calendarId = calendarId;
    this.memberId = memberId;
  }

  getValues() {
    return [this.calendarId, this.memberId];
  }
}

export default CalendarMember;
