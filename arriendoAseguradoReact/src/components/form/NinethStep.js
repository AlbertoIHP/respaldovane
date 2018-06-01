import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import EventEmitter from "react-native-eventemitter";
import NumberFormat from 'react-number-format';
import 'moment/locale/es.js'

import 'react-datepicker/dist/react-datepicker.css';

class NinethStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contract_initDate: '',
            term: '',
            pay_day: '',
            penal: '',
            penalty: '',
            penalty_type: '',
            automatic_renewal: '',
            onload: ''


        };
        this.handleChange = this.handleChange.bind(this);
        this.updateStateTerm = this.updateStateTerm.bind(this);
        this.updateStateDay = this.updateStateDay.bind(this);
        this.updatePenalty = this.updatePenalty.bind(this);
        this.updateStatePenalty = this.updateStatePenalty.bind(this);
        this.updateStatePenaltyType = this.updateStatePenaltyType.bind(this);
        this.updateStateRenewal = this.updateStateRenewal.bind(this);
    }

    
    async componentWillUnmount() {
        this.setState({
            contract_initDate: this.state.contract_initDate.toISOString()
        }, EventEmitter.emit('refreshInfo', this.state) )
    }

    // componentWillMount() {
    //     var value = localStorage.getItem("book");
    //     var decoded = JSON.parse(value);
    //     console.log(value)
    //     if (value) {
    //         this.setState({
    //             term: decoded.term,
    //             pay_day: decoded.pay_day,
    //             penal: decoded.penal,
    //             automatic_renewal: decoded.automatic_renewal
    //         })
    //     }
    // }
    
    handleChange(date) {
        this.setState({
            contract_initDate: date
        });
    }
    updateStateTerm(e) {
        var update_state = this.state.term;
        update_state = e.target.value;
        this.setState({ term: update_state });
        console.log(this.state.term)
    }
    updateStateDay(e) {
        var update_state = this.state.pay_day;
        update_state = e.target.value;
        this.setState({ pay_day: update_state });
        console.log(this.state.pay_day)
    }
    async updatePenalty(e) {
        var update_state = this.state.penal;
        update_state = e.target.value;
        this.setState({ penal: update_state });
        console.log(this.state.penal)
    }
    updateStatePenalty(e) {
        var update_state = this.state.penalty;
        update_state = e.target.value;
        this.setState({ penalty: update_state });
        console.log(this.state.penalty)
    }
    
    updateStatePenaltyType(e) {
        var update_state = this.state.penalty_type;
        update_state = e.target.value;
        this.setState({ penalty_type: update_state });
        console.log(this.state.penalty_type)
    }
    updateStateRenewal(e) {
        var update_state = this.state.automatic_renewal;
        update_state = e.target.value;
        this.setState({ automatic_renewal: update_state });
        console.log(this.state.automatic_renewal)
    }

    async next() {
        var valido = true;
        var error = '';
        if (this.state.contract_initDate == '') {
            valido = false;
            error += "seleccione una Fecha. \n"
        }
        if (this.state.term == "") {
            valido = false;
            error += "ingrese el plazo. \n"
        }

        if (this.state.pay_day == "") {
            valido = false;
            error += "Ingrese el día de pago. \n"
        }
        if(this.state.penal === "true"){
            if (this.state.penalty == "") {
                valido = false;
                error += "Ingrese el monto de la multa por atraso. \n"
            }
            if (this.state.penalty_type == "") {
                valido = false;
                error += "Defina que tipo de multa es. \n"
            }
        }
        if (this.state.automatic_renewal== "") {
            valido = false;
            error += "Defina si tiene renovación automática. \n"
        }

        if (!valido) {
            alert(error);
            return;
        }
        else {
            browserHistory.push('/registro/tenth');
        }
    }
    back() {
        browserHistory.push('/registro/eighth');
    }

    render() {

        return (
            <div>
                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                    <div className="container">
                        <div className=" slide-cont ">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 ">
                                <div className="row">
                                    <div className="text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <h1 className="main-title">Información del contrato de arriendo</h1>
                                        <div className="hidden">
                                            <p className="min">Si todavía estamos a tiempo, te recomendamos ocupar el siguiente contrato tipo, redactado por nuestros abogados
                                            especialistas y que te dará la mayor confianza para cobrar el arriendo.
                                            <a href="" target="_blank">DESCARGA AQUÍ</a></p>
                                            <p className="min">La póliza de arriendo se tomará en base a la información entregada. De existir cambios le solicitamos informar
                                            a la brevedad.</p>
                                            <br />
                                        </div>
                                    </div>
                                    <div className=" text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <img src="/images/woman.jpg" className="img-circle person" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label > Fecha Inicio Contrato</label>
                                            <DatePicker selected={this.state.contract_initDate} onChange={this.handleChange} dateFormat="DD/MM/YYYY" locale="es" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label > Plazo (meses) </label>
                                            <input type="number" className="form-control" name="term" onChange={this.updateStateTerm} value={this.state.term} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label > Día de Pago</label>
                                            <input type="number" className="form-control" name="diaContrato" onChange={this.updateStateDay} value={this.state.pay_day}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="">¿Multa por atraso?</label>
                                        <div className="form-group inputs-radio  with-label ">
                                            <input type="radio"  id="has_penalty" value="true" checked={this.state.penal === "true"} onChange={this.updatePenalty} />
                                            <label htmlFor="has_penalty">Si</label>
                                            <input type="radio"  id="penalty" value="false" checked={this.state.penal === "false"} onChange={this.updatePenalty} />
                                            <label htmlFor="penalty">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.penal == 'true' ? '' : 'hidden'}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label> Monto de la multa </label>
                                                <NumberFormat className="form-control" thousandSeparator={'true'} value={this.state.penalty} thousandSeparator={'.'} decimalSeparator={','} onChange={this.updateStatePenalty} />                                                
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group inputs-radio">
                                                <input type="radio" name="multa" id="diario" value="diario" onChange={this.updateStatePenaltyType} />
                                                <label htmlFor="diario">Monto diario</label>
                                                <input type="radio" name="multa" id="porcentaje" value="porcentaje" onChange={this.updateStatePenaltyType} />
                                                <label htmlFor="porcentaje">% de arriendo diario</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-lg-5 col-lf-offset-1 col-sm-12 col-sm-offset-0">
                                        <div className="form-group">
                                            <label >Tu contrato contempla renovación automática</label>
                                        </div>
                                        <div className="form-group inputs-radio  with-label ">
                                            <input type="radio" name="renovacion" id="true" value="true" checked={this.state.automatic_renewal === "true"} onChange={this.updateStateRenewal}/>
                                            <label htmlFor="true">Si</label>
                                            <input type="radio" name="renovacion" id="false" value="false" checked={this.state.automatic_renewal === "false"} onChange={this.updateStateRenewal}/>
                                            <label htmlFor="false">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                    <button className="main-btn " type="submit" onClick={() => this.next()}>
                                        <i className="fa fa-arrow-rigth"></i>
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default NinethStep;
