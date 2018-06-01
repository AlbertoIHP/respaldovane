import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import NumberFormat from 'react-number-format';
import EventEmitter from "react-native-eventemitter";



class SixthStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            last_name: '',
            email: '',
            phone: '',
            password: '',
            confirm: '',
            onload:''
        };
        this.updateStateName = this.updateStateName.bind(this)
        this.updateStateLastName = this.updateStateLastName.bind(this)
        this.updateStateEmail = this.updateStateEmail.bind(this)
        this.updateStatePhone = this.updateStatePhone.bind(this)
        this.updateStatePassword = this.updateStatePassword.bind(this)
        this.updateStatePasswordConfirm = this.updateStatePasswordConfirm.bind(this)

    }
    componentDidMount(){
        EventEmitter.on('sendInfo', (data) => {
            console.log("recibi todo", data)
        } )
    }

    componentWillMount() {
        var value = localStorage.getItem("book");
        var decoded = JSON.parse(value);
        console.log(value)
        if (value) {
            this.setState({
                name: decoded.name,
                last_name: decoded.last_name,
                email: decoded.email,
                phone: decoded.phone,
                password: decoded.password
            })
        }

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
        updated= e.target.value;
        this.setState({ email: updated });
        console.log(this.state.email)
    }
    updateStatePhone(e) {
        var updated = this.state.phone;
        updated = e.target.value;
        this.setState({ phone: updated });
        console.log(this.state.phone)
    }
    updateStatePassword(e) {
        var updated = this.state.password;
        updated = e.target.value;
        this.setState({ password: updated });
        console.log(this.state.password)
    }
    updateStatePasswordConfirm(e) {
        var updated = this.state.confirm;
        updated = e.target.value;
        this.setState({ confirm: updated });
        console.log(this.state.confirm)
    }

    async next() {
        var valido = true;
        var error = '';
        var phone = this.state.phone.split(' ').join("");
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
        if (phone.length !== 12) {
            valido = false;
            error += "Ingrese número de teléfono válido. \n"
        }
        if (this.state.password == "") {
            valido = false;
            error += "Ingrese contraseña. \n"
        }
        if (this.state.confirm != this.state.password) {
            valido = false;
            error += "Las contraseñas no coinciden. \n"
        }
        if (!valido) {
            alert(error);
            return;
        } else {
            EventEmitter.emit('registerUser', (this.state))
            browserHistory.push('/registro/eighth');
        }
    }
    back() {
        browserHistory.push('/registro/sixth');
    }

    render() {

        return (
            <div>
                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                    <div className="container">
                        <div className=" slide-cont aprobada-evaluacion">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 ">
                                <div className="row">
                                    <div className=" col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 text-center">
                                        <h1 className="main-title">¡Sigamos! Antes de contratar ArriendoAsegurado vamos a necesitar crearte una cuenta</h1>
                                        
                                    </div>
                                    <div className=" text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <img src="/images/woman.jpg" className="img-circle person" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-lg-5 col-lg-offset-1">
                                        <div className="form-group">
                                        <label > Nombre </label>
                                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.updateStateName} />
                                        </div>
                                        <div className="form-group">
                                        <label > Apellido </label>
                                            <input type="text" className="form-control" name="last_name" value={this.state.last_name} onChange={this.updateStateLastName}/>
                                        </div>
                                        <div className="form-group">
                                            <label > Correo Electrónico</label>
                                            <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.updateStateEmail} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-5">
                                        <div className="form-group">
                                        <label >Teléfono</label>
                                        <NumberFormat className="form-control"  value={this.state.phone}  format="+569  #### ####"  onBlur = { this.updateStatePhone } />                                                
                                        </div>
                                        <div className="form-group">
                                        <label >Contraseña</label>
                                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.updateStatePassword} />
                                        </div>
                                        <div className="form-group">
                                        <label >Confirmar Contraseña</label>
                                        <input type="password" className="form-control" name="password_confirmation" onChange={this.updateStatePasswordConfirm} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <button className="main-btn" onClick={() => this.next()}>
                                        Continuar
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
