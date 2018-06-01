import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import EventEmitter from "react-native-eventemitter";


class FifthStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: '',
            onload: ''
        }
        this.updateStatePlan = this.updateStatePlan.bind(this);
    }

    async componentWillUnmount() {
        EventEmitter.emit('refreshInfo', this.state)
    }
    componentWillMount() {
        var value = localStorage.getItem("book");
        var decoded = JSON.parse(value);
        if (value) {
            this.setState({
                plan: decoded.plan,
            })
        }
    }

    updateStatePlan(plan){
        this.setState({ plan: plan })
    }

    async next() {
        var plan = this.state.plan;
        if (plan == "") {
            alert("Seleccione un plan. \n");
            return;
        }else {
            browserHistory.push('/registro/seventh');
        }
    }
    back() {
        browserHistory.push('/registro/fourth');
    }

    render() {

        return (
            <div>
                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                    <div className="container">
                         <div className="  slide-cont planes-container">
                            <div className="row">
                                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 ">
                                    <div className="text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 text-center">
                                        <h1 className="main-title">¡Tu cotización está lista!</h1>
                                        <h4 className="subtitle">Selecciona tu plan según tu disponibilidad de Aval</h4>
                                    </div>
                                    <div className=" text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <img src="/images/woman.jpg" className="img-circle person" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 col-md-offset-2 col-sm-12 col-sm-offset-0">
                                            <a  className={ this.state.plan == '1' ? 'border-orange planes active' : 'border-orange planes'  } data-plan='1' onClick={ ()=> this.updateStatePlan("1") }>
                                                <div  >
                                                    <h5>Con Aval</h5>
                                                    <h3>XXXX <span>Mensual</span></h3>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <a className={this.state.plan == '2' ? 'border-orange planes active' : 'border-orange planes'}data-plan='2' onClick={ ()=> this.updateStatePlan("2") }>
                                                <div >
                                                    <h5>Sin Aval</h5>
                                                    <h3>XXXX <span>Mensual</span></h3>
                                                </div>
                                            </a>
                                        </div>
                                        <div className=" col-md-offset-1 col-md-10 col-sm-12 col-sm-offset-0 ">
                                            <br/>
                                            <h5>Todos los planes incluyen:</h5>
                                            <ul >
                                                <li> <img src={"/images/check.png"} /> Gestión de cobranza judicial y extrajudicial </li>
                                                <li> <img src={"/images/check.png"} /> Cobertura gastos legales por juicios de desalojos</li>
                                                <li> <img src={"/images/check.png"} /> Plataforma online de seguimiento de pagos y manejo siniestros</li>
                                                <li> <img src={"/images/check.png"} /> Pago online para tus arrendatarios </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 text-center">
                                        <button className="main-btn " id="plan-button" onClick={() => this.next()}>
                                            Continuar
                                        </button>
                                        </div>
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

export default FifthStep;
