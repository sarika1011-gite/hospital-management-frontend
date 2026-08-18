import Navbar from "../../layouts/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import AboutSection from "../../components/landing/AboutSection";
import DepartmentSection from "../../components/landing/DepartmentSection";
import DoctorSection from "../../components/landing/DoctorSection";
import WhyChooseUs from "../../components/landing/WhyChooseUs";
import StatisticsSection from "../../components/landing/StatisticsSection";
import HowItWorks from "../../components/landing/HowItWorks";
import ContactSection from "../../components/landing/ContactSection";
import Footer from "../../components/landing/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DepartmentSection />
      <DoctorSection />
      <HowItWorks />
      <WhyChooseUs />
      <StatisticsSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Home;
