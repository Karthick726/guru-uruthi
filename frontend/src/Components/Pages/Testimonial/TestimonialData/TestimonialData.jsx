import React from "react";
import "./TestimonialData.css";
import { FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialData = () => {
  const testimonialData = [
    {
      name: "Arun Kumar",
      role: "Customer",
      feedback:
        "The Moringa Mittai was amazing! It’s healthy, tasty, and gives me real energy throughout the day.",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
          rating: 4
    },
    {
      name: "Priya R",
      role: "Customer",
      feedback:
        "I loved the Moringa Powder. It’s part of my smoothies every morning now. Natural, pure and high quality.",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
          rating: 4
    },
    {
      name: "Vignesh",
      role: "Customer",
      feedback:
        "Guru Uruthi products are authentic and very effective. I feel healthier and more energetic already!",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
          rating: 4
    },
    {
      name: "Sathish",
      role: "Customer",
      feedback:
        "The Karuppu Kavuni Mittai is unique, nutritious, and super tasty! Love that it’s all-natural.",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
          rating: 4
    },
    {
      name: "Lakshmi",
      role: "Customer",
      feedback:
        "I’ve been using the Moringa Capsules for a month now. Feeling more energetic and active every day!",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
          rating: 4
    },
    {
      name: "Ravi",
      role: "Customer",
      feedback:
        "High quality, natural, and affordable. Guru Uruthi products are my go-to for wellness.",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
          rating: 4
    },
  ];

  return (
    <div className=" container con testimonialss-section">
        <div style={{
            textAlign:"center"
        }}>
   <h2 className="testimonial-title">What Our Customers Say</h2>
        <div className="heading-divider"></div>
        </div>
   
      <div className="testimonial-wrapper">
        {testimonialData.map((t, index) => (
          <div className="testimonials-card" key={index}>
           <FaQuoteLeft className="quote-icon" />
            <p className="testimonial-text">{t.feedback}</p>
            <div className="testimonial-footer">
              <img src={t.image} alt={t.name} className="testimonial-img" />
              <div>
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-role">{t.role}</p>
              </div>
               <div className="testimonial-stars">
                              {Array(t.rating)
                                .fill()
                                .map((_, i) => (
                                  <FaStar key={i} color="#FFA500" />
                                ))}
                            </div>
                                        </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialData;
