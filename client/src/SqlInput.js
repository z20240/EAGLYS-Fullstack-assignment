import React, { useState } from "react";
import axios from "axios";

export const ENDPOINT =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3333";

function SqlInput() {
  const [sql, setSql] = useState("");
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    setSql(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post(`${ENDPOINT}/parse`, { sql });
      setResponse(result.data);
    } catch (error) {
      console.error("Error sending SQL:", error);
      setResponse({ error: "Error sending SQL to the server." });
    }
  };

  return (
    <div>
      <textarea
        value={sql}
        onChange={handleInputChange}
        rows="10"
        cols="50"
        placeholder="Enter your SQL here..."
        className="w-full p-2 border rounded"
      ></textarea>
      <br />
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {response.error ? (
        <div className="mt-4 p-2 border border-red-500 rounded bg-red-100 text-red-700">
          {response.error}
        </div>
      ) : (
        <div className="flex m-5">
          <div className="flex-1 p-2 border border-gray-300 rounded-lg">
            <h3 className="mb-2">Modified SQL:</h3>
            <pre className="bg-gray-100 p-2 rounded">
              {response?.modifiedSQL}
            </pre>
          </div>
          <div className="flex-1 p-2 border border-gray-300 rounded-lg ml-2.5">
            <h3 className="mb-2">Map:</h3>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(response?.map, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default SqlInput;
