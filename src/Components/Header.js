import React from 'react';

const Header = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <div className='head-contact'>
            <i className="fas fa-comments fa-2x head-contact-logo"></i> 
            <p className="my-auto ms-3 head-contact-text">Contact Me</p>
            </div>
            <div className="ms-auto head-contact-icons mb-2">
            <a href='https://github.com/sarthikbhat/' target='_BLANK' rel="noreferrer"><i class="fab fa-github fa-2x social-icons mx-2"></i></a>
            <a href='https://www.linkedin.com/in/sarthik-bhat-8333a6169/'target='_BLANK' rel="noreferrer"><i class="fab fa-linkedin fa-2x social-icons mx-2"></i></a>
            <a href='https://www.hackerrank.com/bhatsarthik28?hr_r=1' target='_BLANK' rel="noreferrer"><i class="fab fa-hackerrank fa-2x social-icons mx-2"></i></a>
            <a href='mailto:bhatsarthik28@gmail.com'><i class="fas fa-envelope fa-2x social-icons mx-2"></i></a>
            </div>
            <div className='head-contact-sm d-xs-flex d-sm-none mx-auto mb-4'>
            <i className="fas fa-comments fa-2x head-contact-logo"></i> 
            <p className="my-auto ms-3 head-contact-text">Contact Me</p>
            </div>
        </nav>
    );
}

export default Header;
