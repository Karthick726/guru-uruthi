import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Spinner from "./Components/Common/spinner/Spinner";
import ScrollTop from "./Components/Common/ScrollTop/ScrollTop";
import Home from "./Components/Pages/Home/Home";
import About from "./Components/Pages/About/About";
import { AppProvider } from "./Components/Hooks/Context/AppContext";
import ScrollBar from "./Components/Common/ScrollBar/ScrollBar";
import NotFound from "./Components/Common/NotFound/NotFound";
import Contact from "./Components/Pages/Contact/Contact";
import Testimonial from "./Components/Pages/Testimonial/Testimonial";
import HealthBenefits from "./Components/Pages/HealthBenefits/HealthBenefits";
import Products from "./Components/Pages/Products/Products";
import LandingPage from "./Components/Pages/LandingPage/LandingPage";
// const Home = React.lazy(() => import("./Components/Pages/Home/Home"));



function App() {
  return (
    <div>
      <AppProvider>
        <Toaster
          toastOptions={{
            success: {
              style: {
                duration: 3000,
                background: "green",
                color: "white",
              },
            },
            error: {
              style: {
                duration: 3000,
                background: "red",
                color: "white",
              },
            },
          }}
        />
        <ScrollTop />
        <ScrollBar />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/healty-benefits" element={<HealthBenefits />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bulk-orders" element={<LandingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppProvider>
    </div>
  );
}

export default App;
