import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Footer extends Component {
    toInit() {
        browserHistory.push('/home');
    }
    toRegister() {
        browserHistory.push('/login');
    }
    render() {
        return (
            <div>

                <footer>
                    <div className="container">
                        <div className="row ">
                            <div className="col-md-6 text-left">
                                <ul className="footer-menu-redes">
                                    <li><a> <i className="fa fa-linkedin"></i> </a></li>
                                    <li><a> <i className="fa fa-twitter"></i> </a></li>
                                    <li><a> <i className="fa fa-facebook"></i> </a></li>
                                </ul>
                                <ul className="footer-menu">
                                    <li><a> Sobre Nosotros </a></li>
                                    <li><a> Contáctanos</a></li>
                                    <li><a> Términos de servicio </a></li>
                                    <li><a> Politica de privacidad </a></li>
                                </ul>
                            </div>
                            <div className="col-md-6 text-right">
                                <a  href="" onClick={this.toInit}><img src={"/images/logo-white.png"} /></a>
                                <ul>
                                    <li>Dirección calle 57485 </li>
                                    <li>Santiago de Chile</li>
                                    <li>contacto@arriendoasegurado.com </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-sm-12 text-center">
                                <hr/>
                                <h6>Todos los derechos reservados 2018</h6>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        );
    }
}

export default Footer;
