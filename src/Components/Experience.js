import React from "react";

const Experience = () => {
  return (
    <section
      class="container-fluid anchor pb-5 experiences-section mt-5"
      id="experiences"
    >
      <h2 class="">Experience</h2>
      <hr />
      <div class=" timeline text-justify mt-5 row">
        <div class=" align-items-center relative  d-flex col-12  col-md-8">
          <div class="">
            <div class="experience-entry-heading">
              <h5>
                <a className="no-link" href="https://www.weareaddictives.com/">
                  Addictive Media
                </a>
              </h5>

              <span>
                <h5 class="designation">Software Developer</h5>{" "}
                <p class="text-muted">June 2020 - January 2021</p>
              </span>
            </div>

            <div class="positions">
              <p className="mx-0 my-1 work">
                • Created the android and iOS app for the Big Boy Toyz Ltd which
                is a luxury car resale brand
              </p>

              <p className="mx-0 my-1 work">
                • Worked on obfuscating the code and optimizing the size of the
                app.
              </p>

              <p className="mx-0 my-1 work">
                • Decreasing the page load time of their new cars website
                through optimizing the API calls in NodeJs.
              </p>
            </div>
            <div className="p-tags my-3">
              <div className="d-flex">
                <div className="m-1">
                  <a
                    className="no-link"
                    href="https://play.google.com/store/apps/details?id=com.bigboytoyzapp&hl=en_IN "
                  >
                    BBT Android App
                  </a>
                </div>
                <div className="m-1">
                  <a
                    className="no-link"
                    href="https://apps.apple.com/in/app/big-boy-toyz/id1529588618 "
                  >
                    BBT iOS App
                  </a>
                </div>
                <div className="m-1">
                  <a
                    className="no-link"
                    href="https://www.bigboytoyz.com/newcars/ "
                  >
                    BBT Website
                  </a>
                </div>
                <div className="m-1 me-2">
                  <a className="no-link" href="https://us.weareaddictives.com/">
                    Addictive Media Website
                  </a>
                </div>
                <div className="m-1 mx-2">
                  <a
                    className="no-link"
                    href="https://www.weareaddictives.com/blogs"
                  >
                    Addictive Media Blogs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class=" align-items-center relative  d-flex col-12 col-md-4">
          <div class="">
            <div class="experience-entry-heading">
              <h5>
                {/* <a className="no-link" href="https://www.weareaddictives.com/"> */}
                Preptick
                {/* </a> */}
              </h5>

              <span>
                <h5 class="designation">Web Developer</h5>{" "}
                <p class="text-muted">July 2020 - October 2019</p>
              </span>
            </div>

            <div class="positions">

              <p className="mx-0 my-1 work">
                • Developed the front-end of company's website using React JS.
              </p>

              <p className="mx-0 my-1 work">
                • Assisted in integrating the front end with MySQL and Ruby on
              Rails Environment
              </p>
            </div>
            
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default Experience;
