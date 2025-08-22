import React from "react";
import "./ContactMap.css";

const ContactMap = () => {
  return (
    <section className="contact-map-container">
      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d245.5413705189095!2d78.75171423697515!3d10.044730905490127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDAyJzQxLjAiTiA3OMKwNDUnMDYuMCJF!5e0!3m2!1sen!2sin!4v1755762737898!5m2!1sen!2sin" 
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
