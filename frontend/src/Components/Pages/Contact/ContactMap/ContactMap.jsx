import React from "react";
import "./ContactMap.css";

const ContactMap = () => {
  return (
    <section className="contact-map-container">
      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.976649600492!2d78.09423057583257!3d9.935900674132752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00cff9d7410b33%3A0x754130eecb447bf1!2sHello%20Technologies%20-%20Web%20Development%2C%20Software%20Development%2C%20and%20Digital%20Marketing%20in%20Madurai!5e0!3m2!1sen!2sin!4v1755676014498!5m2!1sen!2sin" 
          width="600"
          height="450"
          style={{ border: "none" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;
