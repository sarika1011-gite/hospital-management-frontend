import { FaUserMd } from "react-icons/fa";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarika Gite",
    department: "Cardiology",
    experience: "10+ Years Experience",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 2,
    name: "Dr. kartik gite",
    department: "Neurology",
    experience: "8+ Years Experience",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    name: "dr.vaishh nikam",
    department: "Orthopedics",
    experience: "12+ Years Experience",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=85",
  },
];

function DoctorSection() {
  return (
    <section id="doctors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#4FA3B8] font-semibold tracking-widest uppercase">
            Our Specialists
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#123044]">
            Meet Our Expert Doctors
          </h2>

          <p className="mt-5 text-[#526675] leading-7">
            Experienced healthcare professionals committed to providing
            personalized and trusted medical care.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-[#F7FAFC] rounded-3xl overflow-hidden border border-[#DCEEF2] shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Doctor Image */}
              <div className="relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />

                {/* Availability */}
                <div className="absolute top-5 right-5 bg-white px-3 py-2 rounded-full shadow-md flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>

                  <span className="text-xs font-semibold text-[#123044]">
                    Available
                  </span>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-7">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
                    <FaUserMd size={20} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#123044]">
                      {doctor.name}
                    </h3>

                    <p className="text-[#0F5B78] text-sm font-medium">
                      {doctor.department}
                    </p>
                  </div>
                </div>

                <p className="text-[#526675] text-sm mt-5">
                  {doctor.experience}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DoctorSection;
