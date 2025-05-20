import { useEffect } from "react";
import "./App.css";
import { db } from "./db";

function App() {
  useEffect(() => {
    const initDB = async () => {
      // Create table if not exists
      await db.exec(`
        CREATE TABLE IF NOT EXISTS todo (
          id SERIAL PRIMARY KEY,
          task TEXT,
          done BOOLEAN DEFAULT false
        );
        INSERT INTO todo (task, done) VALUES ('Install PGlite from NPM', true);
        INSERT INTO todo (task, done) VALUES ('Load PGlite', true);
        INSERT INTO todo (task, done) VALUES ('Create a table', true);
        INSERT INTO todo (task, done) VALUES ('Insert some data', true);
        INSERT INTO todo (task) VALUES ('Update a task');
      `);

      // Insert sample data
      // await db.exec(
      //   `INSERT INTO patients (name, age) VALUES ('John Doe', 40);`
      // );

      // Query data
      // const result = await db.query("SELECT * FROM patients;");
      // console.log("Patients:", result.rows);

      const ret = await db.query(`
        SELECT * from todo;
      `);
      console.log(ret.rows);
    };

    initDB();
  }, []);
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">PGlite Connectivity Test</h1>
        <p>Check the console for output.</p>
      </div>{" "}
    </>
  );
}

export default App;
