import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-800 uppercase tracking-wide">
              Shop
            </h3>
            <ul className="space-y-2">
              <li><Link to="/beds" className="text-gray-600 hover:text-indigo-500 transition">Beds</Link></li>
              <li><Link to="/chairs" className="text-gray-600 hover:text-indigo-500 transition">Chairs</Link></li>
              <li><Link to="/tables" className="text-gray-600 hover:text-indigo-500 transition">Tables</Link></li>
              <li><Link to="/sofas" className="text-gray-600 hover:text-indigo-500 transition">Sofas</Link></li>
              <li><Link to="/storage" className="text-gray-600 hover:text-indigo-500 transition">Storage</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-800 uppercase tracking-wide">
              About Us
            </h3>
            <ul className="space-y-2">
              <li><Link to="/story" className="text-gray-600 hover:text-indigo-500 transition">Our Story</Link></li>
              <li><Link to="/career" className="text-gray-600 hover:text-indigo-500 transition">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-800 uppercase tracking-wide">
              Connect With Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-indigo-500 transition"
                >
                  <FaFacebook className="text-xl" /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-indigo-500 transition"
                >
                  <FaInstagram className="text-xl" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-indigo-500 transition"
                >
                  <FaYoutube className="text-xl" /> YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200"></div>
        <div className="text-center pt-6 text-gray-500 text-base">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-indigo-600">ShopSmart</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
