import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>Shop</h3>
                        <ul>
                            <li>
                                <Link to="/beds">Beds</Link>
                            </li>
                            <li>
                                <Link to="/chairs">Chairs</Link>
                            </li>
                            <li>
                                <Link to="/tables">Tables</Link>
                            </li>
                            <li>
                                <Link to="/lamps">Lamps</Link>
                            </li>
                            <li>
                                <Link to="/wardrobes">Wardrobes</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>About Us</h3>
                        <ul>
                            <li>
                                <Link to="/story">Our Story</Link>
                            </li>
                            <li>
                                <Link to="/career">Careers</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Connect With Us</h3>
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">YouTube</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="copyright">
                    © {new Date().getFullYear()} ShopSmart. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer;