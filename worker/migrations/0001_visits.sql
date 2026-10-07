CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  total_visits INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT
);

INSERT INTO visits (id, total_visits, updated_at)
VALUES (1, 0, NULL)
ON CONFLICT (id) DO NOTHING;
