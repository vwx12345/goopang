import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function UserActionsPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRequest = async (endpoint, method = "POST", body = null, isFormData = false) => {
    try {
      setLoading(true);
      const options = { method };
      
      if (isFormData) {
        options.body = body;
      } else {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(body);
      }
      
      const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Failed to process request" });
    } finally {
      setLoading(false);
    }
  };

  const registerUser = () => {
    handleRequest("/api/users/register", "POST", { email, name, password });
  };

  const loginUser = () => {
    handleRequest("/api/users/login", "POST", { email, password });
  };

  const uploadUserImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    await handleRequest(`/api/users/${userId}/image/register`, "POST", formData, true);
  };

  const deleteUserImage = () => {
    handleRequest(`/api/users/${userId}/image/delete`, "DELETE");
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h2 className="text-xl font-semibold">유저 관련 기능</h2>
      
      {/* 유저 등록 */}
      <div className="border p-4 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold">유저 등록</h3>
        <input type="email" placeholder="Email" className="border p-2 w-full mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Name" className="border p-2 w-full mt-2" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={registerUser} className="bg-green-500 text-white p-2 mt-2 w-full rounded">등록</button>
      </div>
      
      {/* 유저 로그인 */}
      <div className="border p-4 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold">유저 로그인</h3>
        <input type="email" placeholder="Email" className="border p-2 w-full mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={loginUser} className="bg-blue-500 text-white p-2 mt-2 w-full rounded">로그인</button>
      </div>
      
      {/* 유저 이미지 업로드 */}
      <div className="border p-4 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold">유저 이미지 등록</h3>
        <input type="text" placeholder="User ID" className="border p-2 w-full mt-2" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <input type="file" className="border p-2 w-full mt-2" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={uploadUserImage} className="bg-purple-500 text-white p-2 mt-2 w-full rounded">이미지 등록</button>
      </div>
      
      {/* 유저 이미지 삭제 */}
      <div className="border p-4 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold">유저 이미지 삭제</h3>
        <input type="text" placeholder="User ID" className="border p-2 w-full mt-2" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <button onClick={deleteUserImage} className="bg-red-500 text-white p-2 mt-2 w-full rounded">이미지 삭제</button>
      </div>
      
      {/* 응답 출력 */}
      {loading && <p className="text-gray-500">Loading...</p>}
      {response && (
        <div className="border p-4 rounded-lg shadow-lg w-80 mt-4">
          <h2 className="text-lg font-semibold">응답</h2>
          <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
      
      <Link to="/" className="text-blue-500 underline">홈으로</Link>
    </div>
  );
}