import React from "react";
import CampanyItem from "./CampanyItem";
import './Campany.css'

const Campany = () => {
  return (
    <>
      <section className="campaigns">
        <div className="container">
          <div className="campaigns-wrapper">
            <CampanyItem />
            <CampanyItem />
          </div>
          <div className="campaigns-wrapper">
            <CampanyItem />
            <CampanyItem />
          </div>
        </div>
      </section>
    </>
  );
};

export default Campany;
