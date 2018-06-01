import React, { Component } from 'react';
import {  browserHistory } from 'react-router';

class Header extends Component {
    toInit(){
        browserHistory.push('/home');
    }
    toPropietario(e) {
        e.preventDefault();
        browserHistory.push('/propietarios#/login');
    }
    toArrendatario(e) {
        e.preventDefault();
        browserHistory.push('/arrendatarios#/login');
    }
    toRegister(e) {
        e.preventDefault();
        browserHistory.push('/registro');
    }
    render() {
        return (
            <div>

                <header>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header ">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand " href="" onClick={ this.toInit }><img src={"/images/logo.png"} /></a>
                                <a href="" onClick={this.toRegister}  className="onDesk main-btn"> <i className="fa fa-thumbs-up"></i> Obtén tu cotización  </a>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <a className="img-init" onClick={ this.toInit }><img src={"/images/logo.png"} /></a>
                                <ul className="nav navbar-nav navbar-right">
                                    
                                    <li><a href="" onClick={this.toArrendatario}> <i className="fa fa-user"></i> Ingreso arrendatario</a></li>
                                    <li><a href="" onClick={this.toPropietario}> <i className="fa fa-user"></i> Ingreso propietario</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="text-center">
                    <a href="" onClick={this.toRegister} className="onMobile suspend main-btn"> <i className="fa fa-thumbs-up"></i> Obtén tu cotización  </a> 
                
                </div>
            </div>
        );
    }
}

export default Header;
