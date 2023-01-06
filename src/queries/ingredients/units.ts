export const unitsQueries = {
  select: `SELECT * FROM units`,

  selectOptions: `SELECT id, name FROM units`,

  selectById: `
    SELECT * 
    FROM units
    WHERE id = ?`,

  insert: `
    INSERT INTO units SET
    name = ?,
    shortcut = ?`,

  update: `
    UPDATE 
    units SET
    name = ?,
    shortcut = ?
    WHERE id = ?`,

  delete: `DELETE FROM units WHERE id = ?`,
};
