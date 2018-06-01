import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import EventEmitter from "react-native-eventemitter";
import NumberFormat from 'react-number-format';



class TenthStep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lessor_name: '',
            lessor_last: '', 
            lessor_email: '', 
            lessor_phone: '', 
            lessor_rut: '', 
            ocupacion: '',
            value: '',
            decoded: '',
            quotation_id: '', 
            onload: ''
        }
        this.updateStatePersonRut = this.updateStatePersonRut.bind(this);
        this.updateStatePersonName = this.updateStatePersonName.bind(this);
        this.updateStatePersonLastName = this.updateStatePersonLastName.bind(this);
        this.updateStatePersonEmail = this.updateStatePersonEmail.bind(this);
        this.updateStatePersonPhone = this.updateStatePersonPhone.bind(this);
        this.updateStateSelect = this.updateStateSelect.bind(this);
    }

    componentDidMount() {
        var value = localStorage.getItem("book");
        var decoded = JSON.parse(value);
        console.log(value)
        if (value) {
            this.setState({
                lessor_name: decoded.lessor_name,
                lessor_last: decoded.lessor_last,
                lessor_email: decoded.lessor_email,
                lessor_phone: decoded.lessor_phone,
                lessor_rut: decoded.lessor_rut,
                ocupacion: decoded.ocupacion,
                quotation_id: localStorage.getItem('quotation_id')
            })
        }
    }

    async componentWillUnmount() {
        EventEmitter.emit('refreshInfo', this.state)
    }
    
  
    updateStateSelect(e) {
        var update_state = this.state.ocupacion;
        update_state = e.target.value;
        this.setState({ ocupacion: update_state });
    }

    updateStatePersonName(e) {
        var update_state = this.state.lessor_name;
        update_state = e.target.value;
        this.setState({ lessor_name: update_state });
    }
    updateStatePersonLastName(e) {
        var update_state = this.state.lessor_last;
        update_state = e.target.value;
        this.setState({ lessor_last: update_state });
    }
    updateStatePersonEmail(e) {
        var update_state = this.state.lessor_email;
        update_state = e.target.value;
        this.setState({ lessor_email: update_state });
    }
    updateStatePersonPhone(e) {
        var update = this.state.lessor_phone;
        update = e.target.value;
        this.setState({ lessor_phone: update });
    }
    updateStatePersonRut(e) {
        var update_state = this.state.lessor_rut;
        update_state = e.target.value;
        this.setState({ lessor_rut: update_state });
    }

    async next() {
        var valido = true;
        var error = '';
        var phone = this.state.lessor_phone.split(' ').join("");
        if (this.state.lessor_name === '') {
            valido = false;
            error += "Ingrese nombre del arrendatario. \n"
        }
        if (this.state.lessor_last === "") {
            valido = false;
            error += "Ingrese El apellido del arrendatario. \n"
        }
        if (this.state.lessor_email === "") {
            valido = false;
            error += "Ingrese correo electrónico del arrendatario. \n";
        } else {
            var email = this.state.lessor_email;
            var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regExpEmail.test(email)) {
                valido = false;
                error += 'El Email debe contener el formato correcto.\n';
            }
        }
        if (phone.length !== 12) {
            valido = false;
            error += "Ingrese el número del arrendatario. \n"
        }
        if (this.state.lessor_rut === "") {
            valido = false;
            error += "Ingrese el rut del arrendatario. \n"
        }
        if (this.state.ocupacion=== '') {
            valido = false;
            error += "Ingrese ocupación \n"
        }
        if (!valido) {
            alert(error);
            return;
        }
        else {
                EventEmitter.emit('createContract', (this.state))
            }
        }

    render() {

        return (
            <div>
                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                    <div className="container">
                        <div className=" slide-cont ">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 ">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h1 className="main-title">Necesitamos la información del arrendatario</h1>
                                    </div>
                                    <div className="text-center col-md-12">
                                        <img src="/images/woman.jpg" className="img-circle person" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label > Nombre </label>
                                            <input type="text" className="form-control" name="lessor_name" value={this.state.lessor_name} onChange={this.updateStatePersonName}/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label > Apellido </label>
                                            <input type="text" className="form-control" name="lessor_last" value={this.state.lessor_last}  onChange={this.updateStatePersonLastName} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label > Rut</label>
                                            <input type="text" className="form-control" name="lessor_rut" value={this.state.lessor_rut}  onChange={this.updateStatePersonRut}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label > Correo eléctronico</label>
                                            <input type="email" className="form-control" name="lessor_email" value={this.state.lessor_email} onChange={this.updateStatePersonEmail} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label > Teléfono</label>
                                            <NumberFormat className="form-control" value={this.state.lessor_phone} format="+569 #### ####" onBlur={this.updateStatePersonPhone} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Ocupación</label>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group inputs-radio inputs-three" >
                                            <input type="radio" name="ocupacion" id="dependiente" value="dependiente" checked={this.state.ocupacion==="dependiente"} onChange={this.updateStateSelect}/>
                                            <label htmlFor="dependiente">Trabajador dependiente</label>
                                            <input type="radio" name="ocupacion" id="independiente" value="independiente" checked={this.state.ocupacion==="independiente"} onChange={this.updateStateSelect}/>
                                            <label htmlFor="independiente">Trabajador independiente</label>
                                            <input type="radio" name="ocupacion" id="extranjero" value="extranjero" checked={this.state.ocupacion==="extranjero"} onChange={this.updateStateSelect}/>
                                            <label htmlFor="extranjero">Persona extranjera</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <button className="main-btn " type="submit" onClick={ () => this.next()} >
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

export default TenthStep;
