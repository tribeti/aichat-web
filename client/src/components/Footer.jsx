import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-border-light dark:border-border-dark mt-16">
      <div className="container mx-auto px-4 py-12 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">SCANDIHOME</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mang đến không gian sống tối giản, ấm cúng và đầy cảm hứng theo
              phong cách Bắc Âu.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-600 dark:text-gray-400 hover:text-accent"
                  to="/story"
                >
                  Câu chuyện
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 dark:text-gray-400 hover:text-accent">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 dark:text-gray-400 hover:text-accent"
                  to="/career"
                >
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 dark:text-gray-400 hover:text-accent">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 dark:text-gray-400 hover:text-accent">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 dark:text-gray-400 hover:text-accent">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Đăng ký nhận tin</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Nhận thông tin về sản phẩm mới và các chương trình ưu đãi đặc
              biệt.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="form-input w-full pl-3 rounded-r-none rounded-lg text-sm border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-accent focus:border-accent"
              />
              <button
                type="submit"
                className="bg-cta hover:bg-opacity-90 text-white px-4 rounded-l-none rounded-lg text-sm font-bold bg-zinc-800"
              >
                Đăng ký
              </button>
            </form>

            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent transition"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border-light dark:border-border-dark mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SCANDIHOME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
