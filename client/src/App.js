import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AppContext, ContextProvider } from "./context/AppContext";
import { useContext } from "react";
import Form from "./components/Login/Login";
import Main from "./pages/Main/Main";

function App() {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);

    if (localToken) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [token, navigate, setToken]);
  // localStorage.clear();
  return (
    <ContextProvider>
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/" element={token ? <Main /> : <Form />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
