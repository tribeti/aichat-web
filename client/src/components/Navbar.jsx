import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Input } from "./ui/input";

const Navbar = ({ searchQuery = "", setSearchQuery, onSearch }) => {
  const { getTotalItems } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-10">
          <div className="flex items-center gap-10">
            <NavLink to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                SCANDIHOME
              </span>
            </NavLink>

            <nav className="hidden lg:flex items-center gap-6">
              {[
                ["tables", "Bàn"],
                ["chairs", "Ghế"],
                ["beds", "Giường"],
                ["sofas", "Sô pha"],
                ["storage", "Kho chứa"],
              ].map(([path, label]) => (
                <NavLink
                  key={path}
                  to={`/${path}`}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-5 flex-1 justify-end">
            <form
              onSubmit={handleSubmit}
              className="hidden md:block w-full max-w-xs"
            >
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery?.(e.target.value)}
                  className="pl-10 h-10 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-full text-sm"
                />
              </div>
            </form>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <Heart size={20} className="text-gray-700 dark:text-gray-300" />
              </button>

              <NavLink
                to="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <ShoppingCart
                  size={20}
                  className="text-gray-700 dark:text-gray-300"
                />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-black dark:bg-white dark:text-black rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </NavLink>

              <SignedOut>
                <NavLink
                  to="/login"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <User
                    size={20}
                    className="text-gray-700 dark:text-gray-300"
                  />
                </NavLink>
              </SignedOut>

              <SignedIn>
                <div className="rounded-full overflow-hidden">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>

        <nav className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-3">
          <ul className="flex gap-5 flex-wrap">
            {[
              ["tables", "Bàn"],
              ["chairs", "Ghế"],
              ["beds", "Giường"],
              ["sofas", "Sô pha"],
              ["storage", "Kho chứa"],
            ].map(([path, label]) => (
              <li key={path}>
                <NavLink
                  to={`/${path}`}
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? "text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
