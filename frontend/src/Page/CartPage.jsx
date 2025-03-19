import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";


export default function CartPage() {
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/api/carts/register?productId=${productId}&userId=${userId}&quantity=${quantity}`,
        { method: "POST" }
      );
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
      <h2 className="text-xl font-semibold">장바구니 등록</h2>
      <input
        type="text"
        placeholder="User ID"
        className="border p-2 w-full"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product ID"
        className="border p-2 w-full"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        className="border p-2 w-full"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={addToCart} className="bg-green-500 text-white p-2 w-full rounded">
        등록
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
