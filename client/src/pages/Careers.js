import "../Careers.css";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Careers() {
    return (
        <>
        <Navbar />
        <div className="careers-container">
            <div className="hero-section">
                <h1 className="title">Careers</h1>
                <p className="subtitle">
                    Đồng hành cùng chúng tôi – Kiến tạo không gian sống, nuôi dưỡng giá trị con người
                </p>
            </div>


            <div className="careers-content">
                <p>
                    Tại cửa hàng nội thất của chúng tôi, mỗi sản phẩm không chỉ là thành quả của bàn tay khéo léo,
                    mà còn là kết tinh từ niềm đam mê và tâm huyết của cả một tập thể. Chính vì vậy, chúng tôi luôn
                    tìm kiếm những người đồng hành – những con người mang trong mình khát khao sáng tạo, sự tận tâm
                    và lòng yêu nghề.
                </p>


                <p>
                    Chúng tôi tin rằng <strong>một tổ chức vững mạnh được xây dựng từ những con người hạnh phúc</strong>.
                    Do đó, môi trường làm việc tại đây luôn đề cao sự tôn trọng, hợp tác và sẻ chia. Mỗi cá nhân đều
                    được lắng nghe, được khuyến khích phát triển bản thân và được truyền cảm hứng để chinh phục những
                    mục tiêu mới.
                </p>


                <p>
                    Dù bạn là thợ mộc, nhà thiết kế, nhân viên bán hàng hay quản lý, bạn đều có cơ hội trở thành một
                    phần trong hành trình lớn lao – hành trình kiến tạo không chỉ là sản phẩm, mà còn là những kỷ niệm
                    và giá trị bền vững cho khách hàng.
                </p>


                <p>
                    Chúng tôi không ngừng học hỏi, đổi mới và sáng tạo. Làm việc cùng chúng tôi đồng nghĩa với việc bạn
                    sẽ được thử thách, được hỗ trợ và được trao cơ hội để phát triển sự nghiệp lâu dài. Hơn hết, bạn sẽ
                    thấy công việc của mình mang lại ý nghĩa, bởi mỗi ngày trôi qua bạn đều góp phần làm cho một mái ấm
                    trở nên hạnh phúc hơn.
                </p>


                <p className="highlight">
                    Hãy gia nhập đội ngũ của chúng tôi – nơi công việc là niềm vui, nơi con người là trung tâm, và nơi
                    hành trình xây dựng hạnh phúc bắt đầu từ chính bạn.
                </p>
            </div>


            <div className="job-openings">
                <h2 className="section-title">Vị trí tuyển dụng hiện tại</h2>
                <ul>
                    <li>
                        <h3>✨ Thợ mộc lành nghề</h3>
                        <p>
                            Chế tác, lắp ráp và hoàn thiện các sản phẩm nội thất chất lượng cao. Cần kinh nghiệm tối
                            thiểu 2 năm và niềm đam mê với nghề mộc.
                        </p>
                    </li>
                    <li>
                        <h3>🎨 Nhà thiết kế nội thất</h3>
                        <p>
                            Sáng tạo không gian sống độc đáo, thân thiện và tiện nghi. Biết sử dụng phần mềm thiết kế
                            (AutoCAD, SketchUp, 3D Max) là một lợi thế.
                        </p>
                    </li>
                    <li>
                        <h3>🛍️ Nhân viên bán hàng</h3>
                        <p>
                            Tư vấn khách hàng, giới thiệu sản phẩm và mang đến trải nghiệm mua sắm đầy cảm xúc. Yêu cầu
                            kỹ năng giao tiếp tốt và thái độ nhiệt tình.
                        </p>
                    </li>
                    <li>
                        <h3>📦 Quản lý kho</h3>
                        <p>
                            Kiểm soát, sắp xếp và theo dõi hàng hóa trong kho. Cần sự cẩn thận, trách nhiệm và kỹ năng quản lý.
                        </p>
                    </li>
                </ul>


                <div className="apply-section">
                    <p>Nếu bạn quan tâm, hãy nộp hồ sơ ngay hôm nay và cùng chúng tôi kiến tạo hạnh phúc!</p>
                    <button className="apply-button">Apply Now</button>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}