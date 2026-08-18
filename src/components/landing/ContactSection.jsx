import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#4FA3B8] font-semibold tracking-widest uppercase">
            Contact Us
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#123044]">
            We’re Here To Help
          </h2>

          <p className="mt-5 text-[#526675] leading-7">
            Have a question or need assistance? Our healthcare support team is
            ready to help you.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-10 mt-16">
          {/* Left - Contact Information */}
          <div className="bg-[#EAF6F8] rounded-3xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-[#123044]">Get In Touch</h3>

            <p className="mt-3 text-[#526675] leading-7">
              Connect with MediFlow for appointments, hospital information, or
              general assistance.
            </p>

            <div className="mt-8 space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white text-[#0F5B78] flex items-center justify-center shadow-sm">
                  <FaPhoneAlt />
                </div>

                <div>
                  <p className="text-sm text-[#526675]">Call Us</p>

                  <p className="font-semibold text-[#123044]">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white text-[#0F5B78] flex items-center justify-center shadow-sm">
                  <FaEnvelope />
                </div>

                <div>
                  <p className="text-sm text-[#526675]">Email Us</p>

                  <p className="font-semibold text-[#123044]">
                    support@mediflow.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white text-[#0F5B78] flex items-center justify-center shadow-sm">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-sm text-[#526675]">Visit Us</p>

                  <p className="font-semibold text-[#123044]">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white text-[#0F5B78] flex items-center justify-center shadow-sm">
                  <FaClock />
                </div>

                <div>
                  <p className="text-sm text-[#526675]">Working Hours</p>

                  <p className="font-semibold text-[#123044]">
                    Monday – Sunday
                  </p>

                  <p className="text-sm text-[#4FA3B8]">
                    24 / 7 Emergency Support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-[#F7FAFC] rounded-3xl border border-[#DCEEF2] p-8 md:p-10">
            <h3 className="text-2xl font-bold text-[#123044]">
              Send Us A Message
            </h3>

            <p className="mt-3 text-[#526675]">
              We’ll get back to you as soon as possible.
            </p>

            <form className="mt-8 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-white outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-white outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-white outline-none resize-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
                />
              </div>

              {/* Button */}
              <button
                type="button"
                className="w-full bg-[#0F5B78] text-white py-3.5 rounded-xl font-semibold hover:bg-[#123044] transition-all duration-300 shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
