import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  MdLightbulb,
  MdStorefront,
  MdForest,
  MdPublic,
  MdSpa,
  MdConstruction,
} from "react-icons/md";
import { FaGem } from "react-icons/fa";

export default function OurStory() {
  return (
    <>
      <Navbar />
      <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            {/* Main */}
            <main className="flex flex-col items-center">
              <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="@container py-12 md:py-20">
                  <div className="@[480px]:p-4">
                    <div
                      className="flex min-h-[500px] md:min-h-[600px] flex-col gap-6 bg-cover bg-center @[480px]:rounded-xl items-center justify-center p-4 text-center"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)),
                              url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYnZgdr9HekNuDbNfaR770Vldx7D5AUsRj7bjqJXfcjKjIFKi1cDVFsYYYhJeYJ-tDmrOLaaqYxXj1Kb7VAFYr0sTTqNCCtxuKS3j4mlo5wYmVEsOUc9gIDoOhTVrZV8lATGJaQzbD7KzReVDpx-y3o85oBkdDQKbMhde4VEyfGodIMg-945Sco51WRZCU5YepgBx90aWI1Ea2vSKbv7mpsAFXLk5peBb4QmY_YP4zkpeEu5zyeJe_CHiLWTa7ueCrbPlRn9qPbsU")`,
                      }}
                    >
                      <div className="flex flex-col gap-4 max-w-3xl">
                        <p className="text-sm font-bold uppercase text-white/80">
                          CÂU CHUYỆN THƯƠNG HIỆU
                        </p>
                        <h1 className="text-white text-4xl font-extrabold @[480px]:text-5xl leading-tight">
                          Nơi Thiết Kế Gặp Gỡ Tự Nhiên
                        </h1>
                        <h2 className="text-white/90 text-base @[480px]:text-lg leading-relaxed">
                          Khám phá hành trình của Nordik trong việc tạo ra những
                          món đồ nội thất hiện đại, bền vững...
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-12 md:py-20">
                  <h2 className="text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-10 text-center">
                    Hành Trình Của Chúng Tôi
                  </h2>
                  <div className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-x-4 md:gap-x-8 px-4 max-w-3xl mx-auto">
                    <div className="hidden md:flex flex-col items-end pr-8 text-right py-4">
                      <p className="text-lg font-bold">2015</p>
                      <p className="text-base text-text-light/80 dark:text-text-dark/80">
                        Ý tưởng về Nordik ra đời từ niềm đam mê với thiết kế tối
                        giản và vật liệu tự nhiên.
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-primary/30 dark:bg-primary/50 rounded-full p-2">
                        <MdLightbulb className="text-primary dark:text-background-light text-2xl" />
                      </div>
                      <div className="w-0.5 bg-primary/20 dark:bg-primary/30 h-full"></div>
                    </div>

                    <div className="flex md:hidden flex-col pb-10 pl-6">
                      <p className="text-lg font-bold">2015</p>
                      <p className="text-base text-text-light/80 dark:text-text-dark/80">
                        Ý tưởng về Nordik ra đời từ niềm đam mê với thiết kế tối
                        giản và vật liệu tự nhiên.
                      </p>
                    </div>

                    <div className="hidden md:flex"></div>
                    <div className="hidden md:flex"></div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-0.5 bg-primary/20 dark:bg-primary/30 h-full"></div>
                      <div className="bg-primary/30 dark:bg-primary/50 rounded-full p-2">
                        <MdStorefront className="text-primary dark:text-background-light text-2xl" />
                      </div>
                      <div className="w-0.5 bg-primary/20 dark:bg-primary/30 h-full"></div>
                    </div>

                    <div className="flex flex-col pl-6 md:pl-8 py-4 pb-10">
                      <p className="text-lg font-bold">2018</p>
                      <p className="text-base text-text-light/80 dark:text-text-dark/80">
                        Mở cửa hàng flagship đầu tiên, mang trải nghiệm nội thất
                        Bắc Âu đến gần hơn với khách hàng.
                      </p>
                    </div>

                    <div className="hidden md:flex flex-col items-end pr-8 text-right py-4">
                      <p className="text-lg font-bold">2022</p>
                      <p className="text-base text-text-light/80 dark:text-text-dark/80">
                        Ra mắt bộ sưu tập bền vững, sử dụng 100% gỗ tái chế và
                        vật liệu thân thiện môi trường.
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-0.5 bg-primary/20 dark:bg-primary/30 h-full"></div>
                      <div className="bg-primary/30 dark:bg-primary/50 rounded-full p-2">
                        <MdForest className="text-primary dark:text-background-light text-2xl" />
                      </div>
                      <div className="w-0.5 bg-primary/20 dark:bg-primary/30 h-full"></div>
                    </div>

                    <div className="flex md:hidden flex-col pb-10 pl-6">
                      <p className="text-lg font-bold">2022</p>
                      <p className="text-base text-text-light/80 dark:text-text-dark/80">
                        Ra mắt bộ sưu tập bền vững, sử dụng 100% gỗ tái chế và
                        vật liệu thân thiện môi trường.
                      </p>
                    </div>

                    <div className="hidden md:flex"></div>
                    <div className="hidden md:flex"></div>

                    <div className="flex flex-col items-center">
                      <div className="w-0.5 bg-primary/20 dark:bg-primary/30 h-full"></div>
                      <div className="bg-primary/30 dark:bg-primary/50 rounded-full p-2">
                        <MdPublic className="text-primary dark:text-background-light text-2xl" />
                      </div>
                    </div>

                    <div className="flex flex-col pl-6 md:pl-8 py-4">
                      <p className="text-lg font-bold">Hiện tại</p>
                      <p className="text-base text-text-light/80 dark:text-text-dark/80">
                        Vươn ra thị trường quốc tế, lan tỏa giá trị sống tối
                        giản và bền vững đến toàn cầu.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission & Values */}
                <div className="py-12 md:py-20 text-center">
                  <h2 className="text-[28px] font-bold pb-10">
                    Sứ Mệnh &amp; Giá Trị Cốt Lõi
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white/50 dark:bg-white/5">
                      <FaGem className="text-4xl text-primary" />
                      <h3 className="text-xl font-bold">
                        Chất Lượng Vượt Trội
                      </h3>
                      <p className="text-text-light/80 leading-relaxed">
                        Mỗi sản phẩm là một tuyệt tác được chế tác tỉ mỉ...
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white/50 dark:bg-white/5">
                      <MdSpa className="text-4xl text-primary" />
                      <h3 className="text-xl font-bold">Thiết Kế Bền Vững</h3>
                      <p className="text-text-light/80 leading-relaxed">
                        Cam kết sử dụng nguồn gỗ có trách nhiệm...
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white/50 dark:bg-white/5">
                      <MdConstruction className="text-4xl text-primary" />
                      <h3 className="text-xl font-bold">Nghệ Thuật Thủ Công</h3>
                      <p className="text-text-light/80 leading-relaxed">
                        Tôn vinh tay nghề của các nghệ nhân, kết hợp kỹ thuật
                        truyền thống và công nghệ hiện đại để tạo ra những sản
                        phẩm độc đáo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-12 md:py-20">
                  <h2 className="text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-10 text-center">
                    Đội Ngũ &amp; Quy Trình Chế Tác
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2 row-span-2 rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3iyWP0C0X-gDw76tk6glb8swDUsUYeoTSK6HRUKvS_KuHCx1qLgN7Ds4Do4yCQQop8JthL-V9XpZDPJUUqn5jdh7gzwG7TmHvxJfe3z-RPa9sfMHaeY7buD15QcFrX-V274r1iW4SwGvBi156-kZ3GGU5a03ZcvYo8Lwdq6MR7VaHzNkyuXLI6FyBULoIzpp1ROkaFcAp24u87cy7gsV2ZiZ8rIbXzbaIiOuguswsYq9IV5SnP0lwayyyVrrS2gicIxgKoD87P-U"
                        alt="A team of furniture designers collaborating around a wooden table."
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="A portrait of a smiling female artisan in her workshop."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQeOEOc8OmoZL76uwrUjKL2JMtuDeCo4Do45jkLodq89cRQLrkM7XDDdp5rU_B3QKiB4TM54xgQ7oopiAZ0GiBzDwiNnErDIEpAXUCqRsN8NiSy1Lor3rW2Dw98UPjxkL_kAsM23cvjTuWXsgQCp-sX56ZDrhW4Ytw1pm1GX1xYTlSqT38wmARS8-R_ZY4g6GMqvkkoUys88pOMvVKAgLfSl5SaFC0sX1JkrU4sivKbkkRT1GC8xks1zbay5HVuJlDRI7TmXl_Rjg"
                        alt=""
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Close-up of a craftsman carefully sanding a piece of wood."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJqBsFXuVhkHinhQX2zY5FOSWpvcL812m-JQTDY_59sgviq73ZnCMglgU5aluUtsmgADOBUe9PozsgFbB1yKhHM-f5zJn_KSBbY1QIn88QZokXb9Rt9kJx9t70yc2GoAro9uARtdYPfzTjARmUh_ioSgNV0zHXeZQWtIoOF__-yVdZif2oGsGAMEhHa7n_D-ov_hM3Lu4PByiMeDGjej40EkY6JQ9Qj8LM-gtjmD0GUvA2_zgP1oq7bkF_DUZUm_Bu21qE-VTNEQ0"
                        alt=""
                      />
                    </div>
                    <div className="col-span-2 rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="The final assembly of a modern wooden chair in a bright workshop."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf87dUNY3YhOIDb8hlMmA380yaekwqQvi3Ybo090QDBiI4cRyHEjROgrtgbOHK5IsyQSWze4x0oGhWWD-SC-youKUy8Cb8QImIOiIv9HLbw2QXhyliWJTAEeAY4fDAmPzL-7Hq7veTUNe-uu-twJqKtW98jzSE25aAh1D_bZF-DS5jpe__20xHJQewJ8QCcR8yMB2FMCHrL1T2rmA9KqgVX3dL-5Qs7QkGvdB6UvccFw4q09-5rWMILdQwWs_d_eDGn1I7Sxc23yc"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="py-12 md:py-20">
                  <div className="bg-primary/20 dark:bg-primary/10 rounded-xl p-10 md:p-16 text-center flex flex-col items-center gap-6">
                    <h2 className="text-3xl font-bold max-w-xl">
                      Cùng Nordik Kiến Tạo Không Gian Sống Đầy Cảm Hứng
                    </h2>
                    <p className="max-w-2xl text-text-light/80">
                      Khám phá bộ sưu tập nội thất của chúng tôi...
                    </p>

                    <button className="h-12 px-6 rounded-lg bg-primary text-background-dark font-bold hover:opacity-90">
                      Khám phá sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
