import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import EventEmitter from "react-native-eventemitter";



class SixthStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            last_name: '',
            email: '',
            phone: '',
            onload: ''
        }

        this.updateStateName = this.updateStateName.bind(this)
        this.updateStateLastName = this.updateStateLastName.bind(this)
        this.updateStateEmail = this.updateStateEmail.bind(this)
        this.updateStatePhone = this.updateStatePhone.bind(this)
    }
    componentWillMount() {
        var value = localStorage.getItem("book");
        var decoded = JSON.parse(value);
        console.log(value)
        this.setState({
            name: decoded.name,
            last_name: decoded.last_name,
            email: decoded.email,
            phone: decoded.phone
        })

    }
    async componentWillUnmount() {
        EventEmitter.emit('refreshInfo', this.state)
    }

    updateStateName(e) {
        var updated = this.state.name;
        updated = e.target.value;
        this.setState({ name: updated });
        console.log(this.state.name)
    }
    updateStateLastName(e) {
        var updated = this.state.last_name;
        updated = e.target.value;
        this.setState({ last_name: updated });
        console.log(this.state.last_name)
    }
    updateStateEmail(e) {
        var updated = this.state.email;
        updated = e.target.value;
        this.setState({ email: updated });
        console.log(this.state.email)
    }
    updateStatePhone(e) {
        var updated = this.state.phone;
        updated = e.target.value;
        this.setState({ phone: updated });
        console.log(this.state.phone)
    }

    next() {
        var valido = true;
        var error = '';
        var phone = this.state.phone;
        if (this.state.name == '') {
            valido = false;
            error += "Ingrese su nombre. \n"
        }
        if (this.state.last_name == "") {
            valido = false;
            error += "Ingrese su apellido. \n"
        }
        if (this.state.email == "") {
            valido = false;
            error += "Ingrese su correo electrónico. \n"
        } else {
            var email = this.state.email;
            var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regExpEmail.test(email)) {
                valido = false;
                error += 'El Email debe contener el formato correcto.\n';
            }
        }
        if (phone.length !== 9) {
            valido = false;
            error += "Ingrese número de teléfono válido. \n"
        }
        if (!valido) {
            alert(error);
            return;
        } else {
            browserHistory.push('/registro/last');
        }
    }
    back() {
        browserHistory.push('/registro/fifth');
    }

    render() {

        return (
            <div>
                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                    <div className="container">
                        <div className="  slide-cont falla-evaluacion  evaluacion-negativa">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 ">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h4 className="subtitle">Lamentablemente por el momento no podemos aseguras tu arriendo ¡pero no te desanimes! si lo deseas danos tus datos de contacto
                                        y te ayudaremos a encontrar una solución.</h4>
                                    </div>
                                    <div className="text-center col-md-12">
                                        <img src="/images/woman.jpg" className="img-circle person" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label> Nombre </label>
                                            <input type="text" className="form-control" onChange={this.updateStateName}/>
                                        </div>
                                        <div className="form-group">
                                            <label> Apellido </label>
                                            <input type="text" className="form-control" onChange={this.updateStateLastName}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label> Correo Electrónico</label>
                                            <input type="email" className="form-control" onChange={this.updateStateEmail}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono</label>
                                            <input type="number" className="form-control" onChange={this.updateStatePhone}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <button className="main-btn " id="toEnd" type="submit" onClick={ () => this.next()}>
                                            <i className="fa fa-send"></i>
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default SixthStep;
