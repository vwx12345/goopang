import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserPage from "./Page/UserPage";
import CartPage from "./Page/CartPage";
import ProductPage from "./Page/ProductPage";
import UserActionsPage from "./Page/UserActionsPage";

function Home() {
  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h1 className="text-2xl font-bold">API Request Home</h1>
      <nav className="space-y-2">
        <Link to="/user" className="block bg-blue-500 text-white p-2 rounded">유저 조회</Link>
        <Link to="/cart" className="block bg-green-500 text-white p-2 rounded">장바구니 등록</Link>
        <Link to="/products" className="block bg-purple-500 text-white p-2 rounded">제품 전체 조회</Link>
        <Link to="/user-actions" className="block bg-orange-500 text-white p-2 rounded">유저 관리</Link>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/user-actions" element={<UserActionsPage />} />
      </Routes>
    </Router>
  );
}
