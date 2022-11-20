const calendarMembersQueries = {
  createTable: `
    CREATE TABLE calendar_members (
      id int NOT NULL AUTO_INCREMENT,
      calendar_id int NOT NULL,
      member_id int NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY unique_ids_pair (calendar_id, member_id),
      KEY calendar_members_calendar_id_fk_idx (calendar_id),
      KEY calendar_members_member_id_fk_idx (member_id),
      CONSTRAINT calendar_id_fk FOREIGN KEY (calendar_id) REFERENCES calendar (id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT member_id_fk FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  selectByCalendarId: `
    SELECT * FROM calendar_members
    WHERE calendar_id = ?`,

  selectByMemberId: `
    SELECT * FROM calendar_members
    WHERE member_id = ?`,

  insert: `
    INSERT INTO calendar_members SET
    calendar_id = ?,
    member_id = ?`,

  update: `
    UPDATE calendar_members SET
    calendar_id = ?,
    member_id = ?
    WHERE id = ?`,

  delete: `DELETE FROM calendar_members WHERE id = ?`,
};

export default calendarMembersQueries;
