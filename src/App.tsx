import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/HomePage";
import UserPage from "./pages/User/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user/:id" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
