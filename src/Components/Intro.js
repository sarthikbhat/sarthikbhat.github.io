import React from "react";
import me from "../images/me.png";

const Intro = () => {
  return (
    <section className="container px-3 p-sm-5">
      <div className="row my-5 py-5 py-xs-0 my-xs-0 " id="sm-me-div">
      <div className="container col d-xs-flex d-sm-flex d-md-flex d-lg-none mx-auto mb-4 " id="sm-me">
          <img className="me-small" alt='me-small' src={me} />
        </div>
        <div className="col-8 intro-block">
          <h1 className='hey'>Hey! I'm Sarthik Bhat</h1>
          <p className="intro-text">
            I'm aFinal year Computer Engineering student from Dwarkadas J
            Sanghvi College of Engineering. <br/>Well versed with <span className="focus">Full Stack Web
            Development</span>. I am an enthusiast and passionate about learning new
            things. Currently learning <span className="focus">Machine Learning</span> I
            am also passionate about competitive coding and writing. I am
            currently focussed on <span className="focus">Mobile App Development</span> .
          </p>
        </div>
        <div className="col-4 d-none d-lg-block  d-xl-block d-xxl-block">
          <img className="me" alt='me' src={me} />
        </div>
      </div>
    </section>
  );
};

export default Intro;
