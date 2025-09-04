import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcommerceStore from "./components/Store";
import Tables from "./pages/Tables";
import Chairs from "./pages/Chairs";
import Beds from "./pages/Beds";
import OurStory from "./pages/Story";
import Careers from "./pages/Careers";
import Storage from "./pages/Storage";
import Sofas from "./pages/Sofas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EcommerceStore />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/chairs" element={<Chairs />} />
        <Route path="/beds" element={<Beds />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/sofas" element={<Sofas />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/career" element={<Careers />} />
      </Routes>
    </Router>
  );
}

export default App;
