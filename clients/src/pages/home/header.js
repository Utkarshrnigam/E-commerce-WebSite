import React from "react";
import { Carousel } from "antd";
import image1 from "../../images/carousal/images1.jpg";
import image2 from "../../images/carousal/images2.jpg";
import image3 from "../../images/carousal/images3.jpg";
import image4 from "../../images/carousal/images4.jpg";

const Header = () => {
  const contentStyle1 = {
    height: "600px",
    color: "#fff",
    backgroundImage: `url(${image1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
  };
  const contentStyle2 = {
    height: "600px",
    color: "#fff",
    backgroundImage: `url(${image2})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
  };
  const contentStyle3 = {
    height: "600px",
    color: "#fff",
    backgroundImage: `url(${image3})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
  };
  const contentStyle4 = {
    height: "600px",
    color: "#fff",
    backgroundImage: `url(${image4})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
  };
  return (
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle1}></h3>
      </div>
      <div>
        <h3 style={contentStyle2}></h3>
      </div>
      <div>
        <h3 style={contentStyle3}></h3>
      </div>
      <div>
        <h3 style={contentStyle4}></h3>
      </div>
    </Carousel>
  );
};

export default Header;
