import { Route, Routes } from "react-router-dom";
import { BackRoundSlide } from "./components/Forside/BackRoundSlide/SlideShow";
import Home from "./Pages/Home/Home";
import Burger from "./components/Forside/BurgerMenu/Burger";
import Rundstykker from "./components/Product/Rundstykker/Rundstykker";
import Rugbrød from "./components/Product/Rugbrød/Rugbrød";
import Kager from "./components/Product/Kager/Kager";
import Franskbrød from "./components/Product/Franskbrød/Franskbrød";
import Baguettes from "./components/Product/Baguettes/Baguettes";
import ProductDetail from "./components/product/Details/ProductDetails";
import NyhederSite from "./components/NyhederSite/NyhederSite";
import Kontaktside from "./Pages/KontaktSide/KontaktSide";
import Login from "./Pages/Login/Login";
import minSide from "./components/minSide/minSide";
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
        <Route path="/products/:id" element={<ProductDetail />}></Route>
        <Route path="/News/:id" element={<NyhederSite />} />
        <Route path="/Kontakt" element={<Kontaktside />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/minSide" element={<minSide />} />
      </Routes>
    </>
  );
}

export default App;
