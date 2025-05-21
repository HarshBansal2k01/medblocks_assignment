# Patient Registration App

A frontend-only patient registration system using [PGlite](https://www.npmjs.com/package/@electric-sql/pglite) for client-side storage. Users can register patients and query records using raw SQL. Data persists across page refreshes and syncs across multiple tabs.

## Live Demo

[Click here for the LIVE LINK](https://patientregistrationapp.netlify.app/)

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- PGlite (IndexedDB)
- BroadcastChannel API

## Setup Instructions

**Clone the Repository**
   ```bash
   git clone https://github.com/HarshBansal2k01/medblocks_assignment.git
   cd medblocks_assignment
````

**Install Dependencies**

   ```bash
   npm install
   ```

**Run the App**

   ```bash
   npm run dev
   ```

## Usage

* Fill the patient form to register a new patient.
* Use the SQL Query Panel to run custom SQL queries on patient data.

  * Example: `SELECT * FROM patients;`

## Features

* Register new patients (name, age, gender, DOB, medical issue).
* Run custom SQL queries on stored data.
* Persistent data across refreshes using IndexedDB.
* Sync patient records across multiple browser tabs using `BroadcastChannel`.

## Challenges Faced

* **Multi-tab synchronization**: Used the `BroadcastChannel` API to ensure real-time updates across open tabs.
* **Persistent client-side DB**: Leveraged `PGlite` with `IndexedDB` to store data that survives page reloads.
* **Raw SQL parsing in browser**: Had to ensure input sanitization and error handling for SQL queries.

## Commit History

Each feature and enhancement is documented in separate commits for clarity and traceability.
