import {
  FaUserPlus,
  FaUserMd,
  FaCalendarCheck,
  FaStethoscope,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    icon: <FaUserPlus size={25} />,
    title: "Create Your Account",
    description:
      "Register securely and create your personal healthcare profile.",
  },
  {
    number: "02",
    icon: <FaUserMd size={25} />,
    title: "Find Your Doctor",
    description:
      "Choose a department and find the right specialist for your needs.",
  },
  {
    number: "03",
    icon: <FaCalendarCheck size={25} />,
    title: "Book Appointment",
    description:
      "Select an available date and time slot and confirm your appointment.",
  },
  {
    number: "04",
    icon: <FaStethoscope size={25} />,
    title: "Meet Your Doctor",
    description:
      "Visit your doctor, complete your consultation and manage your care.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-[#EAF6F8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#4FA3B8] font-semibold tracking-widest uppercase">
            Simple & Smart
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#123044]">
            How MediFlow Works
          </h2>

          <p className="mt-5 text-[#526675] leading-7">
            Getting quality healthcare is simple. Follow four easy steps to
            manage your appointment.
          </p>
        </div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] border-t-2 border-dashed border-[#A8D2DC]" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 text-center">
              <div className="relative mx-auto w-20 h-20 rounded-full bg-white border-4 border-[#D7EEF2] text-[#0F5B78] flex items-center justify-center shadow-md">
                {step.icon}

                <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#0F5B78] text-white text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-bold text-[#123044]">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#526675]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
