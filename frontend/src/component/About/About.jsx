import React from "react";
import sample from "../../images/ecommerce.jpg";
import sample2 from "../../images/ecommerce2.jpg";
import "./About.css";

const About = () => {
  return (
    <>
      <div className="aboutContainer">
        <div className="textContainer">
          <h1 className="aboutHeading">About Us</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in
            mattis metus. Quisque ullamcorper arcu at risus posuere, mattis
            blandit diam suscipit. Ut porta erat purus, non imperdiet orci
            tristique ut. Suspendisse porta tristique magna et sagittis. Nam
            vehicula nisl at justo accumsan, consequat interdum leo cursus. Nunc
            tempus nulla eget lacinia posuere. Vivamus pellentesque quam a ante
            viverra tincidunt. Suspendisse pharetra lorem ultricies nibh
            scelerisque accumsan.
          </p>
          <p>
            Nam sed ex erat. Mauris faucibus odio velit. Pellentesque vulputate
            lacinia molestie. Integer enim tellus, luctus sit amet mattis et,
            cursus in ante. Mauris pretium felis turpis, nec elementum dolor
            rhoncus et. Mauris id viverra eros, eu pretium orci. Sed sagittis
            rutrum faucibus. Aenean fringilla mollis vestibulum. Nam ultrices
            neque sed aliquam cursus. Etiam lacus arcu, luctus condimentum
            aliquet id, ultricies sit amet ante. Pellentesque non lobortis odio,
            vitae hendrerit metus. Quisque in ligula vel justo aliquam
            tristique.
          </p>
        </div>
        <div className="imagesContainer">
          <img src={sample} alt="Sample" />
          <img src={sample2} alt="Sample2" />
        </div>
      </div>
    </>
  );
};

export default About;
