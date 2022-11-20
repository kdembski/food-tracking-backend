const memberCalendarItemQueries = {
  createTable: `
    CREATE TABLE member_calendar_items (
      id int NOT NULL AUTO_INCREMENT,
      item_id int NOT NULL,
      member_id int NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY unique_ids_pair (item_id, member_id),
      KEY member_calendar_items_item_id_fk_idx (item_id),
      KEY member_calendar_items_member_id_fk_idx (member_id),
      CONSTRAINT item_id_fk FOREIGN KEY (item_id) REFERENCES calendar_items (id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT member_id_fk FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

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

  updateByItemId: `
    UPDATE member_calendar_items SET
    member_id = ?
    WHERE item_id = ?`,

  delete: `DELETE FROM member_calendar_items WHERE id = ?`,
};

export default memberCalendarItemQueries;
