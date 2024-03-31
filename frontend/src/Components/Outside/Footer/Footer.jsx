import React from 'react'
import './style.css'

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <>
     <footer>
        <p>
          © {currentYear} MNNIT. All rights reserved.
          </p>
    </footer>
      
    </>
  )
}

export default Footer;
