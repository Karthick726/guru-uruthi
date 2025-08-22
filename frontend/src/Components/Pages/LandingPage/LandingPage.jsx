import React from "react";
import Header from "../../Common/Layout/Header/Header";
import Footer from "../../Common/Layout/Footer/Footer";
import LandingCarsoual from "./LandingCarsoual/LandingCarsoual";
import LandingChoose from "./LandingChoose/LandingChoose";
import HomeTestimonial from "../Home/HomeTestimonial/HomeTestimonial";
import WhyChooseUs from "../About/WhyChooseUs/WhyChooseUs";
import LandingProducts from "./LandingProducts/LandingProducts";
import LandingAbout from "./LandingAbout/LandingAbout";
import CustomPhoneInput from "./LandingAbout/CustomPhoneInput";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <LandingCarsoual />
      <LandingAbout />
      <LandingChoose />
      <LandingProducts />
      <HomeTestimonial />
      <Footer />
    </div>
  );
};

export default LandingPage;
