import MemberCalendarItemController from "../member-calendar-item.js";

export function addCalendarItemToMembers(itemId, memberIds) {
  return new Promise(async (resolve, reject) => {
    try {
      const promises = memberIds.map((memberId) => {
        return MemberCalendarItemController.addMemberCalendarItem({
          itemId,
          memberId,
        });
      });
      await Promise.all(promises);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function removeCalendarItemFromMembers(itemId, memberIds) {
  return new Promise(async (resolve, reject) => {
    try {
      const promises = memberIds.map((memberId) => {
        MemberCalendarItemController.deleteMemberCalendarItemByMemberIdAndItemId(
          itemId,
          memberId
        );
      });
      await Promise.all(promises);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function updateCalendarItemForMembers(itemId, memberIds) {
  return new Promise(async (resolve, reject) => {
    try {
      const calendarItemMembers =
        await MemberCalendarItemController.getMemberCalendarItemsByItemId(
          itemId
        );
      const calendarItemMemberIds = calendarItemMembers.map(
        (item) => item.memberId
      );

      const memberIdsToBeAdded = memberIds.filter(
        (id) => !calendarItemMemberIds.includes(id)
      );
      const memberIdsToBeRemoved = calendarItemMemberIds.filter(
        (id) => !memberIds.includes(id)
      );

      await removeCalendarItemFromMembers(itemId, memberIdsToBeRemoved);
      await addCalendarItemToMembers(itemId, memberIdsToBeAdded);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
