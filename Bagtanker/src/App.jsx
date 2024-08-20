import { Route, Routes } from "react-router-dom";
import { BackRoundSlide } from "./components/Forside/BackRoundSlide/SlideShow";

import Home from "./Pages/Home/Home";
import Burger from "./components/Forside/BurgerMenu/Burger";
import Products from "./Pages/products/Products";
import Rundstykker from "./components/product/Rundstykker/Rundstykker";

function App() {
  return (
    <>
      <Burger></Burger>
      <BackRoundSlide></BackRoundSlide>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/RundStykker" element={<Rundstykker />}></Route>
      </Routes>
    </>
  );
}

export default App;
