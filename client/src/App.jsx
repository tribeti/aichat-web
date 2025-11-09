import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import EcommerceStore from "./components/Store";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Tables from "./pages/Tables";
import Chairs from "./pages/Chairs";
import Beds from "./pages/Beds";
import OurStory from "./pages/Story";
import Careers from "./pages/Careers";
import Storage from "./pages/Storage";
import Sofas from "./pages/Sofas";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DetailPage from "./pages/DetailPage";
import Admin from "./pages/Admin";

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EcommerceStore />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/tables" element={<Tables />} />
          <Route path="/chairs" element={<Chairs />} />
          <Route path="/beds" element={<Beds />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/sofas" element={<Sofas />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/career" element={<Careers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
