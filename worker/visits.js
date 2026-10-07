function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function toSnapshot(row) {
  if (!row) {
    throw createError(
      "Visit counter is not initialized. Apply the D1 migrations.",
      503,
    );
  }

  return {
    totalVisits: row.total_visits,
    updatedAt: row.updated_at,
  };
}

export async function getVisits(db) {
  const row = await db
    .prepare("SELECT total_visits, updated_at FROM visits WHERE id = 1")
    .first();

  return toSnapshot(row);
}

export async function incrementVisits(db) {
  const row = await db
    .prepare(
      `UPDATE visits
       SET total_visits = total_visits + 1, updated_at = ?
       WHERE id = 1
       RETURNING total_visits, updated_at`,
    )
    .bind(new Date().toISOString())
    .first();

  return toSnapshot(row);
}
