import { Route, Routes } from "react-router-dom";
import { BackRoundSlide } from "./components/Forside/BackRoundSlide/SlideShow";

import Home from "./Pages/Home/Home";
import Burger from "./components/Forside/BurgerMenu/Burger";
import Rundstykker from "./components/product/Rundstykker/Rundstykker";
import Rugbrød from "./components/product/Rugbrød/Rugbrød";
import Kager from "./components/product/Kager/Kager";
import Franskbrød from "./components/product/Franskbrød/Franskbrød";
import Baguettes from "./components/product/Baguettes/Baguettes";

function App() {
  return (
    <>
      <Burger></Burger>
      <BackRoundSlide></BackRoundSlide>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/RundStykker" element={<Rundstykker />}></Route>
        <Route path="/Rugbrød" element={<Rugbrød />}></Route>
        <Route path="/Kager" element={<Kager />}></Route>
        <Route path="/Franskbrød" element={<Franskbrød />}></Route>
        <Route path="/Baguettes" element={<Baguettes />}></Route>
      </Routes>
    </>
  );
}

export default App;
