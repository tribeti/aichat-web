import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ featuredProducts, results, setResults }) => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        const keyword = search.trim().toLowerCase();
        if (!keyword) {
            setResults(featuredProducts);
            return;
        }
        setResults(
            featuredProducts.filter((p) =>
                p.name.toLowerCase().includes(keyword)
            )
        );
    };

    return (
        <header className="header">
            <div className="container">
                <div className="top-bar">
                    <div className="logo">
                        <Link to="/" className="">ShopSmart</Link>
                    </div>
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Tìm sản phẩm nổi bật..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit">
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
                            <Link to="/beds">Beds</Link>
                        </li>
                        <li>
                            <Link to="/lamps">Lamps</Link>
                        </li>
                        <li>
                            <Link to="/wardrobes">Wardrobes</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;