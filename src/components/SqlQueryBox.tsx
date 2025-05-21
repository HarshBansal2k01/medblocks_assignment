import { useState } from "react";
import { getDb } from "../db";

export default function SqlQueryBox() {
  const [sql, setSql] = useState("SELECT * FROM patients;");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const runQuery = async () => {
    setLoading(true);
    try {
      const db = await getDb();

      const res = await db.query(sql);
      setResults(res.rows);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredKeys =
    results.length > 0
      ? Object.keys(results[0]).filter((key) => key !== "id")
      : [];

  return (
    <div className="bg-white shadow-2xl p-8 rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        SQL Query Panel
      </h2>

      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        rows={4}
        className="w-full border border-gray-300 px-4 py-2 mb-4 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
      />

      <button
        onClick={runQuery}
        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          "Run Query"
        )}
      </button>

      {error && <p className="text-red-600 mt-3">❌ {error}</p>}

      {results.length > 0 && (
        <div className="mt-6 overflow-auto max-h-64">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {filteredKeys.map((key) => (
                  <th
                    key={key}
                    className="border px-3 py-2 text-left font-medium text-gray-700"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {filteredKeys.map((key) => (
                    <td key={key} className="border px-3 py-2">
                      {row[key] === null || row[key] === undefined
                        ? "-"
                        : String(row[key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
