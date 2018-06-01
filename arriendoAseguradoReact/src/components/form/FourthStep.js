import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import EventEmitter from "react-native-eventemitter";



class FourthStep extends Component {
    constructor(props) {
        super(props);

    }
    async componentWillUnmount() {
        console.log("ME ESTOY DESTRUYENDO")
        EventEmitter.emit('refreshInfo', this.state)
    }

    next() {
        browserHistory.push('/registro/fifth');
    }
    back() {
        browserHistory.push('/registro/third');
    }

    render() {

        return (
            <div>
                <section className="selection" >
                    <div className="container">
                        <div className="  slide-cont checklist-container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h1 className="main-title">Condiciones que debe cumplir <br/> el contrato de arriendo</h1>
                                    
                                </div>
                                <div className="text-center col-md-12">
                                    <img src="/images/woman.jpg" className="img-circle person" />
                                </div>
                                <div className="col-md-12">
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />A la fecha de contratación del seguro de arriendo el contrato se encuentra vigente y con los pagos al día acreditables</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Contrato tienen vigencia mínima de 1 año (contado desde la fecha de inicio)</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Contrato firmado ante notario</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Prohibición de subarrendar</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Contrato no tiene clausula de arbitraje</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />El propietario no tienen vinculaciones societarias , familiares o de parentesco con el arrendatario</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />El arriendo se pago mensualmente</label>
                                    </div>
                                    <h5>En caso de que el contrato aún no se encuentre firmado, acepto que éste cumplirá con éstas condiciones.</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 text-left">
                                <button className="main-btn" onClick={ () => this.back() }>
                                    <i className="fa fa-arrow-left"></i>
                                    Volver
                                </button>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="main-btn " id="compare" onClick={() => this.next()}>
                                    <i className="fa fa-send"></i>
                                    Enviar Solicitud
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

export default FourthStep;
