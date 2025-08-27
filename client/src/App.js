<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import EcommerceStore from './components/Store';

function App() {
  return (
    <div className="App">
      <EcommerceStore />
    </div>
=======
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import EcommerceStore from './components/Store';
import Electronics from './pages/Electronics';
import Clothing from './pages/Clothing';
import HomeKitchen from './pages/HomeKitchen';
import Beauty from './pages/Beauty';
import Sports from './pages/Sports';
import Deals from './pages/Deals';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EcommerceStore />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/clothing" element={<Clothing />} />
        <Route path="/home-kitchen" element={<HomeKitchen />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/deals" element={<Deals />} />
      </Routes>
    </Router>
>>>>>>> master
  );
}

export default App;
