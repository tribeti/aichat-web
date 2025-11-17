import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaRegLightbulb } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { IoTrendingUp } from "react-icons/io5";

export default function Careers() {
  const cultureItems = [
    {
      icon: FaRegLightbulb,
      title: "Sáng tạo không giới hạn",
      text: "Khuyến khích những ý tưởng mới.",
    },
    {
      icon: GrGroup,
      title: "Tôn trọng sự khác biệt",
      text: "Mỗi cá nhân đều được lắng nghe và tôn trọng.",
    },
    {
      icon: IoTrendingUp,
      title: "Phát triển cùng nhau",
      text: "Cơ hội thăng tiến luôn rộng mở.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
              <div className="layout-content-container flex flex-col w-full max-w-[1100px] flex-1">
                {/* Hero Section */}
                <main className="flex flex-col gap-10 sm:gap-12 md:gap-16 sm:mt-12">
                  <div className="@container">
                    <div className="flex flex-col gap-6 px-4 @[864px]:flex-row @[864px]:items-center bg-card-light dark:bg-card-dark rounded-xl">
                      <div className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center w-full @[864px]:w-1/2 p-4 md:p-6">
                        <div className="flex flex-col gap-4 text-left">
                          <h1 className="text-4xl font-black leading-tight @[480px]:text-5xl">
                            Kiến tạo không gian sống, định hình sự nghiệp của
                            bạn
                          </h1>
                          <h2 className="text-base text-text-muted-light dark:text-text-muted-dark">
                            Gia nhập đội ngũ của chúng tôi và cùng nhau tạo ra
                            những không gian sống đầy cảm hứng.
                          </h2>
                        </div>
                        <button className="flex items-center justify-center rounded-lg h-12 px-5 bg-primary text-white font-bold self-start">
                          Xem các vị trí đang mở
                        </button>
                      </div>

                      <div
                        className="w-full @[864px]:w-1/2 bg-center bg-no-repeat aspect-square sm:aspect-video bg-cover rounded-lg"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOG9yUbRvDmPKWk2hJY8dVgb2NSJxX40MmPUtoO_5flRunA-5arwnONH9XC2vjzz9M1xZqWg_LnvqP0_ySYub7ifhDYFYblz0vb0VZmn1NEEe1UBniGu4Pt5Tq_A1T_yIt7syA4dOvV8bQyYxR3tcsDtJ5WKimfatoFlHIR51hMBFADOf6edO--UNXGlKDVLJtuwyK9spMAssky2C_l-HzXUWN1PgVk4O2p2Tkywrhf-tmZClM0QG9aEHGpEevsrWuxA1CAFPWzWU")',
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Culture Section */}
                  <section className="flex flex-col gap-10 px-4 py-10 @container">
                    <div className="flex flex-col gap-4 max-w-[720px] mx-auto text-center">
                      <h2 className="text-[22px] font-bold">
                        Văn hoá & Giá trị của chúng tôi
                      </h2>
                      <p className="text-base text-text-muted-light dark:text-text-muted-dark">
                        Chúng tôi tin rằng một đội ngũ tuyệt vời được xây dựng
                        trên sự tin tưởng và sáng tạo.
                      </p>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                      {cultureItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.title}
                            className="flex gap-4 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 flex-col items-start"
                          >
                            <div className="text-primary text-3xl">
                              <Icon />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">
                                {item.title}
                              </h3>
                              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                                {item.text}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Job List */}
                  <section className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      {[
                        {
                          title: "Chuyên viên Thiết kế Nội thất",
                          dept: "Thiết kế",
                          loc: "TP. Hồ Chí Minh",
                          type: "Full-time",
                        },
                        {
                          title: "Nhân viên Kinh doanh Dự án",
                          dept: "Kinh doanh",
                          loc: "Hà Nội",
                          type: "Full-time",
                        },
                        {
                          title: "Digital Marketing Executive",
                          dept: "Marketing",
                          loc: "Remote",
                          type: "Part-time",
                        },
                      ].map((job, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row justify-between gap-4 p-6 bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark"
                        >
                          <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold">{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 text-sm text-text-muted-light dark:text-text-muted-dark">
                              <span>Phòng ban: {job.dept}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>Địa điểm: {job.loc}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>Loại hình: {job.type}</span>
                            </div>
                          </div>

                          <button className="h-10 px-4 bg-primary text-white rounded-lg font-bold">
                            Ứng tuyển ngay
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Send CV Section */}
                  <section className="text-center bg-card-light dark:bg-card-dark p-8 rounded-xl flex flex-col items-center gap-4">
                    <h3 className="text-xl font-bold">
                      Không tìm thấy vị trí phù hợp?
                    </h3>
                    <p className="max-w-xl text-text-muted-light dark:text-text-muted-dark">
                      Hãy gửi CV của bạn cho chúng tôi để có cơ hội trong tương
                      lai.
                    </p>
                    <button className="h-12 px-5 bg-primary/20 dark:bg-primary/30 text-primary dark:text-white rounded-lg font-bold">
                      Gửi CV của bạn
                    </button>
                  </section>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
