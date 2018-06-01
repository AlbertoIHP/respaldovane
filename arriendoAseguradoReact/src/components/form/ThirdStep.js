import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import NumberFormat from 'react-number-format';
import EventEmitter from "react-native-eventemitter";


class ThirdStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthly_price: '', type_money: '', rent_tenant: '', total: '', onload: '', loader: 'false'
        };
        this.updateStateArriendo = this.updateStateArriendo.bind(this);
        this.updateStateRenta = this.updateStateRenta.bind(this);
        this.updateStateMoney = this.updateStateMoney.bind(this);

    }

    async componentWillUnmount() {
        EventEmitter.emit('refreshInfo', this.state)
       
    }
    
    componentDidMount() {
        var value = localStorage.getItem("book");
        var decoded = JSON.parse(value);
        console.log(decoded)
        // if (value) {
        //     this.setState({
        //         monthly_price: decoded.monthly_price,
        //         type_money: decoded.type_money, 
        //         rent_tenant: decoded.rent_tenant, 
        //         has_endorsement: decoded.has_endorsement,
        //     })
        //}
        this.setState({
            monthly_price: "200000",
            type_money: "pesos", 
            rent_tenant: "800000"
        })
    }

    updateStateArriendo(e) {
        var updated_state = this.state.monthly_price;
        updated_state = e.target.value;
        updated_state = updated_state.split('.').join("")
        this.setState({ monthly_price: updated_state });
    }
    updateStateMoney(e) {
        var updated_state = this.state.type_money;
        updated_state = e.target.value;
        this.setState({ type_money: updated_state })
    }

    updateStateRenta(e) {
        var updated_state = this.state.rent_tenant;
        updated_state = e.target.value;
        updated_state = updated_state.split('.').join("")
        this.setState({ rent_tenant: updated_state });
    }


    async next() { 
        var arriendo = this.state.monthly_price;
        var renta = this.state.rent_tenant;
        renta = Number.parseInt(renta)
        arriendo = Number.parseInt(arriendo)
        var factor = renta / arriendo;
        console.log(arriendo, renta, factor)
        var valido = true;
        var error = '';
        if (this.state.monthly_price === '') {
            valido = false;
            error += "Ingrese el arriendo mensual. \n"
        }
        if (this.state.type_money === '') {
            valido = false;
            error += "Seleccione el tipo de unidad. \n "
        }
        if (this.state.rent_tenant == "") {
            valido = false;
            error += "Inserte la renta líquida. \n"
        }
        if (!valido) {
            alert(error);
            return;
        }else{
            this.setState({loader: true})
            setTimeout(function () { 
                if (factor >= 3) {
                    browserHistory.push('/registro/fifth');
                } else {
                    browserHistory.push('/registro/sixth');
                }
            }, 2000);
        }
        
    }
    back() {
        browserHistory.push('/registro/second');
    }

    render() {
        let loader = 
            <section className={this.state.loader == 'false' ? 'hidden' : ' fadeInRight animated selection loader-cont'} >
                <div className="container">
                    <div className="active-cont visible-cont slide-cont">
                        <div className="row">
                            <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-12  text-center">
                                <img src={"/images/preloader.gif"} className="img-responsive"  />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        return (
            <div>
                {loader}
                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                    <div className="container">
                        <div className=" slide-cont  renta-container">
                            <div className="row">
                                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 ">
                                
                                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 text-center">
                                        <h1 className="main-title">Necesitamos la siguiente información sobre tú contrato de arriendo </h1>
                                    
                                    </div>
                                    <div className="text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <img src="/images/woman.jpg" className="img-circle person" />
                                    </div>
                                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <div className="row">
                                            <div className="col-md-8  col-lg-offset-1 col-lg-7 col-md-offset-0">
                                                <div className="form-group">
                                                    <label htmlFor="">Arriendo Mensual</label>
                                                    <NumberFormat className="form-control"  thousandSeparator={'true'} value={this.state.monthly_price} thousandSeparator={'.'} decimalSeparator={','} onChange={(e) => this.updateStateArriendo(e)} />                                                
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-lg-3">
                                                <div className="form-group inputs-radio tipo-pago" >
                                                    <input type="radio" name="tipo-pago" id="uf" value="uf" checked={this.state.type_money==="uf"} onChange={this.updateStateMoney} />
                                                    <label htmlFor="uf">UF</label>
                                                    <input type="radio" name="tipo-pago" id="pesos" value="pesos" onChange={this.updateStateMoney} checked={this.state.type_money === "pesos"} />
                                                    <label htmlFor="pesos">Pesos</label>
                                                </div>
                                            </div>
                                            <div className="col-md-10  col-lg-offset-1 col-lg-10 col-md-offset-0">
                                                <div className="form-group">
                                                    <label htmlFor="">Renta Liquida Mensual (Aprox)</label>
                                                    <NumberFormat className="form-control" thousandSeparator={'true'} value={this.state.rent_tenant} thousandSeparator={'.'} decimalSeparator={','} onChange={(e) => this.updateStateRenta(e)} />    
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 text-center">
                                        <button className="main-btn  " onClick={() => this.next()}>
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

export default ThirdStep;
