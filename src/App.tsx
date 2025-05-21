import PatientForm from "./components/PatientForm";
import SqlQueryBox from "./components/SqlQueryBox";

export default function App() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-white">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-wide">
        Patient Registration App
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div>
          <PatientForm />
        </div>
        <div>
          <SqlQueryBox />
        </div>
      </div>
    </div>
  );
}
