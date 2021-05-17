
import me from "../images/me.png";

const Intro = () => {
  return (
    <section className="container px-3 px-sm-5">
      <div className="row my-5 pt-5 py-xs-0 my-xs-0 " id="sm-me-div">
        <div className="container col-12 d-xs-flex d-sm-flex d-md-flex d-lg-none mx-auto mb-4 " id="sm-me">
          <img className="me-small" width='100' height='100' alt='me-small' src={me} />
        </div>
        <div className="">
          <a href='https://sarthikbhat.me/assets/sarthik_resume.pdf' className='no-pls resume2 '>
            <div className='cv-contact-sm d-xs-flex mx-auto mb-4 resume2'>
              <p className="my-auto head-contact-text">Resume</p>
            </div>
          </a>
        </div>
        <div className="col-8 intro-block">
          <h1 className="hey"><span className="upAnim" style={{animationDelay: '0s'}}>H</span><span className="upAnim" style={{animationDelay: '0.0333333s'}}>e</span><span className="upAnim" style={{animationDelay: '0.0666667s'}}>y</span><span className="jump" style={{animationDelay: '1.2s'}}>!</span>
          {' '}<span className="upAnim" style={{animationDelay: '0.166667s'}}>I</span><span className="upAnim" style={{animationDelay:' 0.2s'}}>'</span><span className="upAnim" style={{animationDelay: '0.233333s'}}>m</span>
          {' '}<span className="upAnim" style={{animationDelay: '0.3s'}}>S</span><span className="upAnim" style={{animationDelay: '0.333333s'}}>a</span><span className="upAnim" style={{animationDelay: '0.366667s'}}>r</span><span className="upAnim" style={{animationDelay:' 0.4s'}}>t</span><span className="upAnim" style={{animationDelay: '0.433333s'}}>h</span><span className="upAnim" style={{animationDelay:' 0.466667s'}}>i</span><span className="upAnim" style={{animationDelay: '0.5s'}}>k</span>
          {' '}<span className="upAnim" style={{animationDelay:' 0.566667s'}}>B</span><span className="upAnim" style={{animationDelay: '0.6s'}}>h</span><span className="upAnim" style={{animationDelay: '0.633333s'}}>a</span><span className="upAnim" style={{animationDelay: '0.666667s'}}>t</span></h1>
          {/* <h1 className='hey'>{("Hey! I'm Sarthik Bhat").split('').map((elm,index)=>{
            return (
              elm.trim()===0?
              '  '
              :
              <span className="upAnim" style={{animationDelay:(index/30)+'s'}} key={index}>{elm}</span>
              
            )
          })}</h1> */}
          <p className="intro-text">
            I'm a Final year Computer Engineering student from Dwarkadas J
            Sanghvi College of Engineering. <br />Well versed with <span className="focus">Full Stack Web
            Development</span>. I am an enthusiast and passionate about learning new
            things. Currently learning <span className="focus">Machine Learning</span> I
            am also passionate about competitive coding and writing. I am
            currently focussed on <span className="focus">Mobile App Development</span>.
          </p>
        </div>
        <div className="col-4 d-none d-lg-block  d-xl-block d-xxl-block">
          <img className="me" width='100' height='100' alt='me' src={me} />
        </div>
      </div>
    </section>
  );
};

export default Intro;
