import "../Story.css"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function OurStory() {
    return (
        <>
            <Navbar />
            <div className="our-story-container">
                <div className="hero-section">
                    <h1 className="title">Our Story</h1>
                    <p className="subtitle">
                        Hành trình từ những mảnh gỗ thô sơ đến không gian sống đầy cảm hứng
                    </p>
                </div>

                <div className="story-content">
                    <p>
                        Câu chuyện của chúng tôi bắt đầu từ một niềm tin giản dị: <strong>mỗi ngôi nhà đều xứng
                            đáng được thổi hồn bằng sự ấm áp và tình yêu thương</strong>. Từ những ngày đầu chỉ có vài
                        dụng cụ thô sơ và một nhóm nhỏ những người thợ mộc đam mê, chúng tôi đã dần dần tạo nên
                        một hành trình đầy ý nghĩa.
                    </p>

                    <p>
                        Ngày ấy, xưởng mộc nhỏ nằm nép mình trong một con phố yên bình. Tiếng cưa gỗ, mùi nhựa cây
                        và bàn tay chai sạn của người thợ chính là khởi nguồn của mọi sản phẩm. Chúng tôi tin rằng
                        nội thất không chỉ đơn thuần là vật dụng – <em>nó là nơi gắn kết yêu thương, là điểm tựa
                            trong những bữa cơm sum vầy, là góc nhỏ yên tĩnh để ta tìm về sau một ngày dài</em>.
                    </p>

                    <p>
                        Có những thời điểm khó khăn, ánh sáng trong xưởng tưởng chừng như tắt lịm. Nhưng niềm tin
                        rằng mỗi chiếc bàn, mỗi chiếc ghế có thể mang lại niềm vui, sự kết nối và hạnh phúc đã giữ
                        chúng tôi đứng vững. Mỗi sản phẩm ra đời đều mang trong mình câu chuyện – câu chuyện về
                        bàn tay cần mẫn, về giọt mồ hôi rơi, và cả niềm tự hào của những người thợ.
                    </p>

                    <p>
                        Khi những sản phẩm đầu tiên được đưa đến tay khách hàng, chúng tôi đã nhìn thấy nụ cười,
                        sự xúc động và cả niềm hạnh phúc trong ánh mắt họ. Chính những khoảnh khắc ấy khiến chúng
                        tôi hiểu rằng, sứ mệnh của mình không chỉ là làm ra đồ nội thất, mà là <strong>tạo ra ký ức,
                            nâng niu từng khoảnh khắc trong mái ấm</strong>.
                    </p>

                    <p>
                        Ngày hôm nay, chúng tôi tự hào khi được đồng hành cùng hàng nghìn gia đình trên hành trình
                        biến những ngôi nhà thành tổ ấm. Mỗi sản phẩm là sự kết hợp giữa chất liệu tự nhiên, thiết
                        kế tinh tế và tâm huyết của người thợ. Chúng tôi cam kết mang đến không chỉ chất lượng bền
                        vững, mà còn là giá trị tinh thần lâu dài cho mỗi khách hàng.
                    </p>

                    <p className="highlight">
                        Chúng tôi không chỉ bán nội thất, chúng tôi kiến tạo không gian sống. Chúng tôi chia sẻ
                        câu chuyện – câu chuyện về tình yêu, về mái ấm, và về niềm tin rằng hạnh phúc được bắt đầu
                        từ chính những điều giản dị.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
