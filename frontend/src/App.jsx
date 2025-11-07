import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import First from "./pages/first";// ✅ Capitalized component name
import PasswordForget from "./pages/PasswordForget";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<First />} /> {/* ✅ Proper component usage */}
        <Route path="/forgetpassword" element={<PasswordForget />} />
        <Route path="/land" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;