import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcommerceStore from "./components/Store";
import Tables from "./pages/Tables";
import Chairs from "./pages/Chairs";
import Beds from "./pages/Beds";
import Lamps from "./pages/Lamps";
import Wardrobes from "./pages/Wardrobes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EcommerceStore />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/chairs" element={<Chairs />} />
        <Route path="/beds" element={<Beds />} />
        <Route path="/lamps" element={<Lamps />} />
        <Route path="/wardrobes" element={<Wardrobes />} />
      </Routes>
    </Router>
  );
}

export default App;
