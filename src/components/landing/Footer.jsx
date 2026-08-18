import {
  FaHeartbeat,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#123044] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#0F5B78] flex items-center justify-center">
                <FaHeartbeat className="text-white text-xl" />
              </div>

              <span className="text-2xl font-bold">
                Medi<span className="text-[#70C5D8]">Flow</span>
              </span>
            </div>

            <p className="mt-5 text-[#B8CBD3] leading-7 text-sm max-w-xs">
              Smart healthcare management made simple. Book appointments,
              connect with doctors and manage your healthcare journey with ease.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#0F5B78] transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#0F5B78] transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#0F5B78] transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#0F5B78] transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-sm text-[#B8CBD3]">
              <li>
                <a href="#home" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-white transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="#departments" className="hover:text-white transition">
                  Departments
                </a>
              </li>

              <li>
                <a href="#doctors" className="hover:text-white transition">
                  Our Doctors
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Our Services</h3>

            <ul className="space-y-3 text-sm text-[#B8CBD3]">
              <li>Doctor Appointments</li>
              <li>OPD Management</li>
              <li>Patient Management</li>
              <li>Online Consultations</li>
              <li>Prescription Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>

            <div className="space-y-4 text-sm text-[#B8CBD3]">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-[#70C5D8] mt-1 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt className="text-[#70C5D8] mt-1 shrink-0" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="text-[#70C5D8] mt-1 shrink-0" />
                <span>support@mediflow.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-[#9FB5BF]">
            © {new Date().getFullYear()} MediFlow. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-[#9FB5BF]">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
