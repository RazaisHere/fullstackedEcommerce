import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Product from "./components/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const elements = gsap.utils.toArray(".reveal-up");

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "top 30%",
            scrub: true,
            toggleActions: "play none none reverse",
            onEnter: () => ScrollTrigger.refresh(), // Refresh ScrollTrigger
          },
          delay: index * 0.1,
        }
      );
    });

    // Refresh ScrollTrigger after page load to account for smooth scrolling
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis root>
      <div
        className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <ToastContainer />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />

          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
