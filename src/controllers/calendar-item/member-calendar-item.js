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

export function removeCalendarItemFromMembers(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const memberCalendarItems =
        await MemberCalendarItemController.getMemberCalendarItemsByItemId(
          itemId
        );
      const promises = memberCalendarItems.map((item) => {
        MemberCalendarItemController.deleteMemberCalendarItem(item.id);
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
      await removeCalendarItemFromMembers(itemId);
      await addCalendarItemToMembers(itemId, memberIds);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
