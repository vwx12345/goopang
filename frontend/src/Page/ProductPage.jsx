import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";


export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h2 className="text-xl font-semibold">제품 전체 조회</h2>
      <button onClick={fetchProducts} className="bg-blue-500 text-white p-2 w-full rounded">
        제품 조회
      </button>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {products.length > 0 && (
        <ul className="bg-gray-100 p-4 rounded w-full">
          {products.map((product) => (
            <li key={product.id} className="border-b p-2">
              <strong>{product.name}</strong>: {product.description} (₩{product.price})
            </li>
          ))}
        </ul>
      )}
      <Link to="/" className="text-blue-500 underline">홈으로</Link>
    </div>
  );
}
