import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserPage() {
  const [userId, setUserId] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8002/api/users/${userId}`);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Failed to fetch data" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h2 className="text-xl font-semibold">유저 조회</h2>
      <input
        type="text"
        placeholder="User ID"
        className="border p-2 w-full"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={fetchUser} className="bg-blue-500 text-white p-2 w-full rounded">
        조회
      </button>
      {loading && <p className="text-gray-500">Loading...</p>}
      {response && (
        <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm w-full">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
      <Link to="/" className="text-blue-500 underline">홈으로</Link>
    </div>
  );
}
