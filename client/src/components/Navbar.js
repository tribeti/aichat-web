import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useTransition } from "react";

const Navbar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e) => {
    const value = e.target.value;
    startTransition(() => {
      setSearchQuery(value);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="top-bar">
          <div className="logo">
            <Link to="/" className="">
              ShopSmart
            </Link>
          </div>
          <form className="search-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tìm sản phẩm nổi bật..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button type="submit" disabled={isPending}>
              <FaSearch />
            </button>
          </form>
          <div className="nav-icons">
            <a href="#account">
              <FaUser size={20} />
            </a>
            <a href="#cart">
              <FaShoppingCart size={20} />
              <span className="badge">{2}</span>
            </a>
          </div>
        </div>
        <nav className="nav-bar">
          <ul>
            <li>
              <Link to="/" className="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tables">Tables</Link>
            </li>
            <li>
              <Link to="/chairs">Chairs</Link>
            </li>
            <li>
              <Link to="/sofas">Sofas</Link>
            </li>
            <li>
              <Link to="/beds">Beds</Link>
            </li>
            <li>
              <Link to="/storage">Storage</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
