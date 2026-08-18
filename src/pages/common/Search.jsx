import { useState } from "react";
import {
  searchDoctors,
  searchPatients,
  searchDepartments,
} from "../../services/searchService";

const Search = () => {
  const [type, setType] = useState("doctors");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      let data;

      if (type === "doctors") {
        data = await searchDoctors({ search });
        setResults(data.doctors || []);
      } else if (type === "patients") {
        data = await searchPatients({ search });
        setResults(data.patients || []);
      } else {
        data = await searchDepartments({ search });
        setResults(data.departments || []);
      }
    } catch (err) {
      console.error("Search error:", err);

      setError(err.response?.data?.message || "Search failed.");

      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Search</h1>

        <p className="mt-1 text-sm text-gray-500">
          Search doctors, patients and departments.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-6 rounded-xl bg-white p-5 shadow"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setResults([]);
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          >
            <option value="doctors">Doctors</option>
            <option value="patients">Patients</option>
            <option value="departments">Departments</option>
          </select>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${type}...`}
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-xl bg-white shadow">
        {results.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No results found.</div>
        ) : (
          <div className="divide-y">
            {results.map((item) => (
              <div key={item._id} className="p-5">
                {type === "doctors" && (
                  <>
                    <h3 className="font-semibold text-gray-800">
                      Dr. {item.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.specialization || "N/A"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.email || "N/A"}
                    </p>

                    <p className="text-sm text-gray-500">
                      Department: {item.department?.name || "N/A"}
                    </p>
                  </>
                )}

                {type === "patients" && (
                  <>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>

                    <p className="text-sm text-gray-500">
                      {item.email || "N/A"}
                    </p>

                    <p className="text-sm text-gray-500">
                      Phone: {item.phone || "N/A"}
                    </p>

                    <p className="text-sm text-gray-500">
                      Gender: {item.gender || "N/A"}
                    </p>
                  </>
                )}

                {type === "departments" && (
                  <>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>

                    <p className="text-sm text-gray-500">
                      Status: {item.status || "N/A"}
                    </p>

                    {item.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
