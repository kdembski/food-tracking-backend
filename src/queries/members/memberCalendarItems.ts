export const memberCalendarItemsQueries = {
  selectById: `
  SELECT * FROM member_calendar_items
  WHERE id = ?`,

  selectByItemId: `
    SELECT * FROM member_calendar_items
    WHERE item_id = ?`,

  selectByMemberId: `
    SELECT * FROM member_calendar_items
    WHERE member_id = ?`,

  insert: `
    INSERT INTO member_calendar_items SET
    item_id = ?,
    member_id = ?`,

  update: `
    UPDATE member_calendar_items SET
    item_id = ?,
    member_id = ?
    WHERE id = ?`,

  delete: `DELETE FROM member_calendar_items WHERE id = ?`,

  deleteByItemIdAndMemberId: `
    DELETE FROM member_calendar_items 
    WHERE item_id = ? 
    AND member_id = ?`,
};
