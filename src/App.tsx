import React, { useEffect, useState } from "react";
import PatientForm from "./components/PatientForm";
import SqlQueryBox from "./components/SqlQueryBox";
import db from "./db";

export default function App() {
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      const res = await db.query(
        `SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public';`
      );
      const rows = res.rows as { table_name: string }[];
      const tableNames = rows.map((row) => row.table_name);
      setTables(tableNames);
    };

    fetchTables();
  }, []);
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await db.query(`
          SELECT column_name, data_type
          FROM information_schema.columns
          WHERE table_name = 'patients' AND table_schema = 'public';
        `);

        const rows = res.rows as { column_name: string; data_type: string }[];
        console.log("Columns and types:", rows);
        // You can set this data to state if you want to display it
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    fetchColumns();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Existing Tables</h1>
      <ul className="list-disc pl-5">
        {tables.map((table, idx) => (
          <li key={idx}>{table}</li>
        ))}
      </ul>
    </div>
    // <div className="min-h-screen p-6 bg-gray-100">
    //   <h1 className="text-3xl font-bold mb-6 text-center">
    //     Patient Registration App
    //   </h1>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //     <div>
    //       <PatientForm />
    //     </div>
    //     <div>
    //       <SqlQueryBox />
    //     </div>
    //   </div>
    // </div>
  );
}
