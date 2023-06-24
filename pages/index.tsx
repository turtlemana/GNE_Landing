import type { NextPage } from "next";

import Introduce from "components/templates/riskWeather/Introduce";
import Monitoring from "components/templates/riskWeather/Monitoring";
import State from "components/templates/riskWeather/State";
import About from "components/templates/riskWeather/About";
import Guide from "components/templates/riskWeather/Guide";

const Home: NextPage = () => {
  return (
    <>
      <Introduce />
      <Monitoring />
      <State />
      <About />
      <Guide />
    </>
  );
};

export default Home;
