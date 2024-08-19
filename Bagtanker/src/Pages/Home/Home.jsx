import React from "react";
import { BackRoundSlide } from "../../components/Forside/BackRoundSlide/SlideShow";
import Burger from "../../components/Forside/BurgerMenu/Burger";
import FetchNyheder from "../../components/Forside/Nyheder/Nyheder";

const Home = () => {
  return (
    <>
      <Burger></Burger>
      <FetchNyheder></FetchNyheder>
      <BackRoundSlide></BackRoundSlide>
    </>
  );
};

export default Home;
