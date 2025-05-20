import PatientForm from "./components/PatientForm";
import SqlQueryBox from "./components/SqlQueryBox";

export default function App() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Patient Registration App
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
