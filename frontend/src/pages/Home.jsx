import React from "react";

import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSellers from "../components/BestSellers";
import Policy from "../components/Policy";
import Subscribe from "../components/Subscribe";

function Home() {
  return (
    <div style={{ fontFamily: "Poppins,sans-serif" }}>
      <Hero />
      <LatestCollection />
      <BestSellers />
      <Policy />
      <div className="reveal-up">
        <Subscribe />
      </div>
    </div>
  );
}

export default Home;
