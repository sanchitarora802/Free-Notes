import React from 'react'

const Footer = () => {
    return (
        <>
            {/* <!-- Footer --> */}
            <footer className="page-footer bg-primary pt-4">

                <div className='container text-white align-items-center'>
                    <div className='align-middle text-center'>
                    <i className="fa-brands fa-facebook fa-2x mx-3"></i>
                    <i className="fa-brands fa-instagram fa-2x mx-3"></i>
                    <i className="fa-brands fa-linkedin fa-2x mx-3"></i>
                    <i className="fa-brands fa-twitter fa-2x mx-3"> </i>
                    </div>
                </div>
                
                {/* <!-- Copyright --> */}
                <div className="footer-copyright text-center text-white py-3">© 2020 Copyright:
                    <a className='text-white' href="/"> Free-Notes.com</a>
                </div>

            </footer>
        </>
    )
}

export default Footer