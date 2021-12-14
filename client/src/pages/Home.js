import React from "react";
import Ranking from "../components/Ranking";
import Record from "../components/Record";
import "../style/Home.scss";

function Home() {
  return (
    <div className="home_container">
      <Record></Record>
      <Ranking></Ranking>
    </div>
  );
}

export default Home;
