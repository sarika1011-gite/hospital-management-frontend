import {
  FaUserMd,
  FaAmbulance,
  FaClock,
  FaLaptopMedical,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserMd size={35} />,
    title: "Expert Doctors",
    desc: "Highly qualified specialists dedicated to providing trusted and compassionate healthcare.",
  },
  {
    icon: <FaClock size={35} />,
    title: "24/7 Support",
    desc: "Get reliable healthcare support whenever you need it.",
  },
  {
    icon: <FaAmbulance size={35} />,
    title: "Emergency Care",
    desc: "Fast and efficient support for urgent healthcare needs.",
  },
  {
    icon: <FaLaptopMedical size={35} />,
    title: "Digital Records",
    desc: "Secure and organized digital management of your healthcare records.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#EAF6F8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#4FA3B8] font-semibold tracking-widest uppercase">
            Why Choose Us
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#123044]">
            Healthcare Designed Around You
          </h2>

          <p className="mt-5 text-[#526675] leading-7">
            MediFlow combines trusted medical professionals with smart
            technology to make healthcare simple, connected and reliable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mt-16">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl border border-[#DCEEF2] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center group-hover:bg-[#0F5B78] group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#123044]">
                {item.title}
              </h3>

              <p className="mt-3 text-[#526675] leading-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
