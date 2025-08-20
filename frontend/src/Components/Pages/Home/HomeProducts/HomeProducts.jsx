import React from "react";
import "./HomeProducts.css";
import service from "../../../../assets/Images/packages-images.png";
import benefitsIcon from "../../../../assets/Images/benefits.svg"; // ✅ renamed
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NextArrow = ({ onClick }) => (
  <div className="carousel-arrow arrow-btn next" onClick={onClick}>
    <IoIosArrowForward />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="carousel-arrow  arrow-btn prev" onClick={onClick}>
    <IoIosArrowBack />
  </div>
);

var settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

const HomeProducts = () => {
  const navigate=useNavigate()
  const productData = [
    {
      productName: "Moringa Mittai",
      description:
        'The "Miracle Tree" transformed into a delicious traditional sweet. Packed with 90+ nutrients, 46 antioxidants, and 18 amino acids. Perfect for daily nutrition and energy boost.',
      image: service,
      benefits: [
        "7x more Vitamin C than oranges",
        "Rich in antioxidants",
        "Boosts immunity",
        "7x more Vitamin C than oranges",
        "Rich in antioxidants",
        "Boosts immunity",
      ],
    },
    {
      productName: "Moringa Powder",
      description:
        "A superfood powder rich in vitamins, minerals, and essential amino acids. Perfect addition to smoothies, juices, and meals for daily health.",
      image: service,
      benefits: [
        "Improves digestion",
        "Supports healthy skin",
        "Enhances energy levels",
        "7x more Vitamin C than oranges",
        "Rich in antioxidants",
        "Boosts immunity",
      ],
    },
  ];

  return (
    <div className="product-carousel">
      <div className="container con">
        <div className="process-header">
          <h2 className="main-title" style={{
            color:"white"
          }}>Our Signature Products</h2>
          <div className="heading-divider"></div>
          <p className="sub-text" style={{
            color:"white"
          }}>
            Handcrafted with care, blending age-old recipes and wholesome
            ingredients. Discover sweets that are as nutritious as they are
            delicious
          </p>
        </div>

        <Slider {...settings}>
          {productData.map((product, index) => (            <div className="product-card">
      <div className="product-content">
        <span className="product-subtitle">GURU URUTHI, REAL BENEFITS</span>
        <h2 className="product-title">{product.productName}</h2>
        <p className="product-desc">{product.description}</p>

          

        <button className="shop-btn" onClick={()=>{
                  navigate("/contact")
        }}>
          SHOP NOW <span>→</span>
        </button>
      </div>

      <div className="product-image">
        <img src={product.image} alt={product.productName} />
      </div>
      <div style={{
        display:"flex",
        flexDirection:"column",
        gap:"10px"
      }}>
 <h2>Key Hightlights</h2>
              <ul>
                 {product.benefits.slice(0,5).map((benefit, i) => (
                  <li key={i}>
                    <img src={benefitsIcon} alt="benefit icon" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
    </div>           
    
//     <div className="product-card" key={index}>
//               <div>
//   <h3>{product.productName}</h3>
//               <p>{product.description}</p>
//               </div>
//               <img src={product.image} alt={product.productName} />
              
//             <div>
//  <h2>Key Hightlights</h2>
//               <ul>
//                 {product.benefits.map((benefit, i) => (
//                   <li key={i}>
//                     <img src={benefitsIcon} alt="benefit icon" />
//                     {benefit}
//                   </li>
//                 ))}
//               </ul>
//             </div>
             
//             </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeProducts