import React from "react";
import MainBanner from "../component/MainBanner";
import Categories from "../component/Categories";
import BestSeller from "../component/BestSeller";
import BottomBanner from "../component/BottomBanner";
import NewsLetter from "../component/NewsLetter";
import useTitle from "../hooks/useTitle";

function Home() {
  useTitle("Home");

  return (
    <div className="mt-10 px-6 md:px-16 lg:px-24 xl:px-32">
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
}

export default Home;
