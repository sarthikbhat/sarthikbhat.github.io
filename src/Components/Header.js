import React from 'react';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light container">

            <a href='/' className='no-pls'>
                <svg width="323" height="304" viewBox="0 0 323 304" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.83267 300.75L161.5 6.41682L317.167 300.75H5.83267Z" stroke="black" strokeWidth="6" />
                    <circle cx="162.5" cy="206.5" r="91.5" stroke="black" strokeWidth="6" />
                    <line x1="161" y1="8" x2="161" y2="117" stroke="black" strokeWidth="6" />
                    <path d="M161.398 210.621C145.318 205.999 133.599 200.335 126.242 193.629C118.951 186.858 115.305 178.525 115.305 168.629C115.305 157.431 119.764 148.186 128.684 140.895C137.668 133.538 149.322 129.859 163.645 129.859C173.41 129.859 182.102 131.747 189.719 135.523C197.401 139.299 203.326 144.508 207.492 151.148C211.724 157.789 213.84 165.048 213.84 172.926H194.992C194.992 164.332 192.258 157.594 186.789 152.711C181.32 147.763 173.605 145.289 163.645 145.289C154.4 145.289 147.173 147.34 141.965 151.441C136.822 155.478 134.25 161.109 134.25 168.336C134.25 174.13 136.691 179.046 141.574 183.082C146.522 187.053 154.888 190.699 166.672 194.02C178.521 197.34 187.766 201.018 194.406 205.055C201.112 209.026 206.06 213.681 209.25 219.02C212.505 224.358 214.133 230.641 214.133 237.867C214.133 249.391 209.641 258.635 200.656 265.602C191.672 272.503 179.66 275.953 164.621 275.953C154.855 275.953 145.741 274.098 137.277 270.387C128.814 266.611 122.271 261.467 117.648 254.957C113.091 248.447 110.812 241.057 110.812 232.789H129.66C129.66 241.383 132.818 248.186 139.133 253.199C145.513 258.147 154.009 260.621 164.621 260.621C174.517 260.621 182.102 258.603 187.375 254.566C192.648 250.53 195.285 245.029 195.285 238.062C195.285 231.096 192.844 225.725 187.961 221.949C183.078 218.108 174.224 214.332 161.398 210.621Z" fill="black" />
                    <line x1="162" y1="301" x2="162" y2="262" stroke="black" strokeWidth="6" />
                </svg>

            </a>

            <div className="ms-auto head-contact-icons mb-2">
            <a href='https://github.com/sarthikbhat/'  className='disp'  target='_BLANK' rel=" noopener noreferrer"><i className="fab fa-github fa-2x social-icons mx-2"></i></a>
            <a href='https://www.linkedin.com/in/sarthik-bhat-8333a6169/' className='disp' target='_BLANK' rel="noopener noreferrer"><i className="fab fa-linkedin fa-2x social-icons mx-2"></i></a>
            <a href='https://www.hackerrank.com/bhatsarthik28?hr_r=1' className='disp'  target='_BLANK' rel="noopener noreferrer"><i className="fab fa-hackerrank fa-2x social-icons mx-2"></i></a>
            <a href='mailto:bhatsarthik28@gmail.com' className='disp'><i className="fas fa-envelope fa-2x social-icons mx-2"></i></a>
                <a href='https://sarthikbhat.me/assets/sarthik_resume.pdf' className='no-pls resume1'>
                    <div className='head-contact'>
                        <p className="my-auto head-contact-text">Resume</p>
                    </div>
                </a>
            </div>
            {/* <div className="head-contact-icons mb-2">
            
            </div> */}
            {/* <div className='head-contact-sm d-xs-flex d-sm-none mx-auto mb-4'>
            <i className="fas fa-comments fa-2x head-contact-logo"></i> 
            <p className="my-auto ms-3 head-contact-text">Contact Me</p>
            </div> */}
        </nav>
    );
}

export default Header;


