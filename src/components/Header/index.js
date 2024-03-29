import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../pages.css';
import logo from '../../logoPart.svg'

function Header() {
  return (
    <nav className="navbar fixed-top nvb navbar-light bg-white static-top ">
    <div className="container">
      <a className="navbar-brand" href="/#">
        <img src={logo} alt="Camion de livraison" className=" m-auto text-primary" width="118px" height="40px" /> 
      </a>
      <a href="/#" className="nva"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-telephone" fill="currentColor">
  <path fillRule="evenodd" d="M3.925 1.745a.636.636 0 0 0-.951-.059l-.97.97c-.453.453-.62 1.095-.421 1.658A16.47 16.47 0 0 0 5.49 10.51a16.471 16.471 0 0 0 6.196 3.907c.563.198 1.205.032 1.658-.421l.97-.97a.636.636 0 0 0-.06-.951l-2.162-1.682a.636.636 0 0 0-.544-.115l-2.052.513a1.636 1.636 0 0 1-1.554-.43L5.64 8.058a1.636 1.636 0 0 1-.43-1.554l.513-2.052a.636.636 0 0 0-.115-.544L3.925 1.745zM2.267.98a1.636 1.636 0 0 1 2.448.153l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/>
</svg> 00 00 00 00 00</a>
      <div className="rd-navbar-element">
        <a className="button-default-outline" href="/#">REVENIR AU SITE PRINCIPAL</a>
      </div>
    </div>
  </nav>
  );
}

export default Header;
