import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import React, { useState, useTransition } from "react";
import { useCart } from "../context/CartContext";

const Navbar = ({ searchQuery = "", setSearchQuery, onSearch }) => {
    const [isPending, startTransition] = useTransition();
    const { getTotalItems } = useCart();

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (setSearchQuery) {
            startTransition(() => {
                setSearchQuery(value);
            });
        }
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
                        <NavLink to="/" className="">
                            ShopSmart
                        </NavLink>
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
                        <NavLink to="/login">
                            <FaUser size={20} />
                        </NavLink>
                        <NavLink to="/cart">
                            <FaShoppingCart size={20} />
                            {getTotalItems() > 0 && <span className="badge">{getTotalItems()}</span>}
                        </NavLink>
                    </div>
                </div>
                <nav className="nav-bar">
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/tables" className={({ isActive }) => (isActive ? "active" : "")}>
                                Tables
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/chairs" className={({ isActive }) => (isActive ? "active" : "")}>
                                Chairs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/sofas" className={({ isActive }) => (isActive ? "active" : "")}>
                                Sofas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/beds" className={({ isActive }) => (isActive ? "active" : "")}>
                                Beds
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/storage" className={({ isActive }) => (isActive ? "active" : "")}>
                                Storage
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
