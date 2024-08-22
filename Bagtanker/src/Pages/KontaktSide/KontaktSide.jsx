import React from "react";
import FormKontakt from "../../components/Kontakt/FormKontakt";
import "./KontaktSide.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "../../components/Forside/Footer/Footer";

const Contact = () => {
  return (
    <>
      <section id="container">
        <article id="fix">
          {" "}
          <FormKontakt />
          <MapContainer
            style={{ height: "500px", width: "500px" }}
            center={[57.0479261, 9.9648879]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </article>
        <Footer></Footer>
      </section>
    </>
  );
};

export default Contact;
