
import me from "../images/me.png";
import meWebp from "../images/me.webp";
import meJp2 from "../images/me.jp2";
import meJxr from "../images/me.jxr";

const Intro = () => {
  return (
    <section className=" px-3 px-sm-3">
      <div className="row my-5 pt-5 py-xs-0 my-xs-0 " id="sm-me-div">
        <div className="container col-12 d-xs-flex d-sm-flex d-md-flex d-lg-none mx-auto mb-4 " id="sm-me">
          <picture>
            <source className="me-small" width='100' height='100' alt='me-small' type='image/webp' srcSet={meWebp} />
            {/* <source className="me-small" width='100' height='100' alt='me-small' type='image/jxr' srcSet={meJxr} />
            <source className="me-small" width='100' height='100' alt='me-small' type='image/jp2' srcSet={meJp2} /> */}
          <img className="me-small" width='100' height='100' alt='me-small' src={me} />
          </picture>
        </div>
        <div className="">
          <a href='https://sarthikbhat.me/assets/sarthik_resume.pdf' target='_BLANK' rel=" noopener noreferrer" className='no-pls resume2 '>
            <div className='cv-contact-sm d-xs-flex mx-auto mb-4 resume2'>
              <p className="my-auto head-contact-text">Resume</p>
            </div>
          </a>
        </div>
        <div className="col-8 intro-block">
          <h1 className="hey"><span className="upAnim" style={{ animationDelay: '0s' }}>H</span><span className="upAnim" style={{ animationDelay: '0.0333333s' }}>e</span><span className="upAnim" style={{ animationDelay: '0.0666667s' }}>y</span><span className="jump" style={{ animationDelay: '1.2s' }}>!</span>
            {' '}<span className="upAnim" style={{ animationDelay: '0.166667s' }}>I</span><span className="upAnim" style={{ animationDelay: ' 0.2s' }}>'</span><span className="upAnim" style={{ animationDelay: '0.233333s' }}>m</span>
            {' '}<span className="upAnim" style={{ animationDelay: '0.3s' }}>S</span><span className="upAnim" style={{ animationDelay: '0.333333s' }}>a</span><span className="upAnim" style={{ animationDelay: '0.366667s' }}>r</span><span className="upAnim" style={{ animationDelay: ' 0.4s' }}>t</span><span className="upAnim" style={{ animationDelay: '0.433333s' }}>h</span><span className="upAnim" style={{ animationDelay: ' 0.466667s' }}>i</span><span className="upAnim" style={{ animationDelay: '0.5s' }}>k</span>
            {' '}<span className="upAnim" style={{ animationDelay: ' 0.566667s' }}>B</span><span className="upAnim" style={{ animationDelay: '0.6s' }}>h</span><span className="upAnim" style={{ animationDelay: '0.633333s' }}>a</span><span className="upAnim" style={{ animationDelay: '0.666667s' }}>t</span></h1>
          <div className="code-bg" id="code-sel">
            <div className="red" />
            <div className="yellow" />
            <div className="green" />
            <p className="intro-text">
              <span className="comment">{'//'} Some Text About Me</span>
              <br />
            I'm a <span className="focus some">Computer Engineer</span> from <span className="focus marker">Dwarkadas J
            Sanghvi College of Engineering</span>. <br />Well versed with <span className="focus keyword">Full Stack Web and App development</span>. 
            I love to do competitive coding and solve problems using technology.
            {/* Currently learning <span className="focus keyword">Machine Learning</span>  */}
            I'm also proficient in <span className="focus keyword">MERN stack, GraphQL, SQL and python</span>. <br/>I am an enthusiast and constantly learning new technologies.
           
            <span className="cursor"></span>
            </p >
          </div>
        </div>
        <div className="col-4 d-none d-lg-flex  d-xl-flex d-xxl-flex heya">
          <picture>
            <source className="me" width='100' height='100' type='image/webp' alt='me' srcSet={meWebp} />
            <source className="me" width='100' height='100' type='image/jxr' alt='me' srcSet={meJxr} />
            <source className="me" width='100' height='100' type='image/jp2' alt='me' srcSet={meJp2} />
            <img className="me" width='100' height='100' alt='me' src={me} />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Intro;
