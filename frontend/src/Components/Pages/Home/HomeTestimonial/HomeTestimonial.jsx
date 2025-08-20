import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./HomeTestimonial.css";




const NextArrow = ({ onClick }) => (
  <div className="carousel-arrow arrow-btn next" onClick={onClick}>
   <IoIosArrowForward />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div  className="carousel-arrow arrow-btn prev" onClick={onClick}>
   <IoIosArrowBack />
  </div>
);

const HomeTestimonial = () => {
  const settings = {
   dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
      nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };




const data = [
  {
    name: "Robert Fox",
    role: "Customer",
    feedback:
      "The Moringa Mittai was amazing! It’s healthy, tasty, and gives me real energy throughout the day. Definitely recommend it!.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    name: "Dianne Russell",
    role: "Customer",
    feedback:
      "I loved the Moringa Powder. It’s part of my smoothies every morning now. Natural, pure and high quality.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5
  },
  {
    name: "Eleanor Pena",
    role: "Customer",
    feedback:
      "Guru Uruthi products are authentic and very effective. I feel healthier and more energetic already!.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 4
  },
  {
    name: "Cameron Williamson",
    role: "Customer",
    feedback:
      "Guru Uruthi products are authentic and very effective. I feel healthier and more energetic already!",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    rating: 5
  },
];
  return (
    <div className="testimonials-section ">
        <div className="container con">
            <div style={{
                marginBottom:"50px",
                textAlign:"center"
            }}>
  <h2 className="testimonial-title">Client Testimonials</h2>
  <div className="heading-divider"></div>
            </div>


      <Slider {...settings}>
        {data.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <FaQuoteLeft className="quote-icon" />
            <p className="testimonial-text">{item.feedback}</p>
            <div className="testimonial-footer">
              <img src={item.image} alt={item.name} className="testimonial-img" />
              <div>
                <h4 className="testimonial-name">{item.name}</h4>
                <span className="testimonial-role">{item.role}</span>
              </div>
              <div className="testimonial-stars">
                {Array(item.rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} color="#FFA500" />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
        </div>
    
    </div>
  );
};

export default HomeTestimonial;
