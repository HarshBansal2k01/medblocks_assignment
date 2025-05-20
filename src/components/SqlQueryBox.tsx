import { useState } from "react";
import db from "../db";

export default function SqlQueryBox() {
  const [sql, setSql] = useState("SELECT * FROM patients;");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const runQuery = async () => {
    try {
      const res = await db.query(sql);
      setResults(res.rows);
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Run SQL Query</h2>
      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        rows={4}
        className="w-full border px-3 py-2 mb-4 rounded"
      />
      <button
        onClick={runQuery}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Run Query
      </button>
      {error && <p className="text-red-600">Error: {error}</p>}
      {results.length > 0 && (
        <table className="w-full border text-sm">
          <thead>
            <tr>
              {Object.keys(results[0]).map((key) => (
                <th key={key} className="border px-2 py-1 text-left">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((val, i) => (
                  <td key={i} className="border px-2 py-1">
                    {val === null || val === undefined ? "" : String(val)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
