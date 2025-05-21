import { PGlite } from "@electric-sql/pglite";

export async function getDb() {
  const db = new PGlite("idb://patient-db", {
    relaxedDurability: true,
  });
  await db.waitReady;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      dob TEXT NOT NULL,
      medical_problem TEXT NOT NULL
    );
  `);

  return db;
}
