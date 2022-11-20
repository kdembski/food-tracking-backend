class MemberCalendarItem {
  constructor(itemId, memberId) {
    this.itemId = itemId;
    this.memberId = memberId;
  }

  getValues() {
    return [this.itemId, this.memberId];
  }
}

export default MemberCalendarItem;
