import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoPage from "./pages/TodoPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />

        </Routes>
         <ToastContainer position="top-right" style={{zIndex:100}}/>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
