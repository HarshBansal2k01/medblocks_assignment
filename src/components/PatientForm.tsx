import React, { useState } from "react";
import { getDb } from "../db";

export default function PatientForm() {
  const channel = new BroadcastChannel("patient-updates");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    medical_problem: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, age, gender, dob, medical_problem } = formData;
    const db = await getDb();
    // await db.exec(`
    //   INSERT INTO patients (name, age, gender, dob, medical_problem)
    //   VALUES ('${name}', ${age}, '${gender}', '${dob}', '${medical_problem}')
    // `);
    await db.exec(`
    INSERT INTO patients (name, age, gender, dob, medical_problem)
    VALUES (
    '${name.replace(/'/g, "''")}', 
    ${age}, 
    '${gender.replace(/'/g, "''")}', 
    '${dob}', 
    '${medical_problem.replace(/'/g, "''")}'
  );
`);

    channel.postMessage("patient-updated");

    setMessage("Patient registered successfully.");
    setFormData({
      name: "",
      age: "",
      gender: "",
      dob: "",
      medical_problem: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Register New Patient</h2>

      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Medical Problem</label>
        <input
          type="text"
          name="medical_problem"
          value={formData.medical_problem}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </form>
  );
}
