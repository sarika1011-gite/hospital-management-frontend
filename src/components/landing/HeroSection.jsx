import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#EAF6F8]">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#BBDDE4]/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="min-h-[calc(100vh-80px)] grid lg:grid-cols-[42%_58%] items-center">
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-20 py-16 lg:py-20">
            <p className="text-[#0F5B78] font-semibold tracking-[0.25em] text-sm mb-5">
              YOUR HEALTHCARE PARTNER
            </p>

            <h1 className="text-[#123044] text-5xl sm:text-6xl lg:text-[72px] font-bold leading-[1.02] tracking-tight">
              Meet The
              <br />
              <span className="text-[#0F5B78]">Best Experts</span>
            </h1>

            <p className="mt-7 text-[#526675] text-lg leading-8 max-w-md">
              Trusted healthcare professionals, effortless appointment booking
              and smarter patient care — all in one place.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/login"
                className="group flex items-center gap-3 bg-[#0F5B78] text-white px-7 py-4 rounded-lg font-semibold hover:bg-[#123044] transition-all shadow-lg"
              >
                Book Appointment
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#doctors"
                className="flex items-center px-7 py-4 rounded-lg border border-[#0F5B78] text-[#0F5B78] font-semibold hover:bg-white transition-all"
              >
                Meet Our Doctors
              </a>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap gap-5 mt-8">
              <div className="flex items-center gap-2 text-sm text-[#526675]">
                <FaCheckCircle className="text-[#4FA3B8]" />
                Verified Doctors
              </div>

              <div className="flex items-center gap-2 text-sm text-[#526675]">
                <FaCheckCircle className="text-[#4FA3B8]" />
                Easy Booking
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE AREA ================= */}
          <div className="relative min-h-[650px] flex items-center justify-center">
            {/* Large Medical Background Shape */}
            <div className="absolute right-0 bottom-8 w-[88%] h-[82%] bg-[#BBDDE4] rounded-tl-[180px] rounded-tr-[40px] rounded-bl-[40px]" />

            {/* Doctors Image */}
            <div className="relative z-10 w-full h-[620px] flex items-center justify-center">
              <img
                src="/images/doctors-group.png"
                alt="Our Expert Doctors"
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* ================= FLOATING DOCTOR CARD ================= */}
            <div className="absolute z-30 left-0 bottom-20 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EAF6F8] flex items-center justify-center text-[#0F5B78] font-bold text-xl">
                +
              </div>

              <div>
                <p className="text-xl font-bold text-[#123044]">50+</p>

                <p className="text-xs text-[#526675]">Expert Doctors</p>
              </div>
            </div>

            {/* ================= AVAILABILITY CARD ================= */}
            <div className="absolute z-30 right-0 top-24 bg-white rounded-2xl shadow-xl px-5 py-4">
              <p className="text-sm font-bold text-[#123044]">
                Healthcare Support
              </p>

              <p className="text-xs text-[#4FA3B8] mt-1">Available 24 / 7</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
