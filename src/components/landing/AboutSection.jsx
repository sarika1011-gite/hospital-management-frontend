import {
  FaUserMd,
  FaHeartbeat,
  FaHospital,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT - IMAGE */}
          <div className="relative">
            {/* Background Shape */}
            <div className="absolute -left-5 -bottom-5 w-full h-full rounded-3xl bg-[#EAF6F8]" />

            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85"
                alt="Modern Healthcare"
                className="w-full h-[560px] object-cover"
              />

              {/* Floating Experience Card */}
              <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
                    <FaHospital size={22} />
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-[#123044]">10+</p>
                    <p className="text-sm text-[#526675]">
                      Years of Excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - CONTENT */}
          <div>
            <p className="text-[#4FA3B8] font-semibold tracking-widest uppercase">
              About MediFlow
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-[#123044]">
              Modern Healthcare,
              <br />
              <span className="text-[#0F5B78]">Designed Around You</span>
            </h2>

            <p className="mt-6 text-[#526675] leading-8">
              MediFlow is a smart hospital appointment and OPD management
              platform designed to connect patients, doctors and healthcare
              teams through one simple digital experience.
            </p>

            <p className="mt-4 text-[#526675] leading-8">
              From finding the right specialist to booking an appointment,
              managing consultations and accessing prescriptions, everything is
              organized in one secure platform.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
                  <FaUserMd />
                </div>

                <div>
                  <h3 className="font-bold text-[#123044]">Expert Doctors</h3>

                  <p className="text-sm text-[#526675] mt-1">
                    Trusted medical professionals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
                  <FaHeartbeat />
                </div>

                <div>
                  <h3 className="font-bold text-[#123044]">Patient First</h3>

                  <p className="text-sm text-[#526675] mt-1">
                    Care focused on your needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
                  <FaShieldAlt />
                </div>

                <div>
                  <h3 className="font-bold text-[#123044]">Secure Records</h3>

                  <p className="text-sm text-[#526675] mt-1">
                    Your healthcare data stays protected.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
                  <FaCheckCircle />
                </div>

                <div>
                  <h3 className="font-bold text-[#123044]">Easy Booking</h3>

                  <p className="text-sm text-[#526675] mt-1">
                    Simple and convenient appointments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
