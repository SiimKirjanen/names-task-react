import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/HomePage";
import UserPage from "./pages/User/UserPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
