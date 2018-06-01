import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import EventEmitter from "react-native-eventemitter";


class FirstStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: '',
            onload: ''
        };

    }


    async next(contract)
    {
        this.setState({ contract: contract })
        await this.setState( pre => {
            pre.contract = contract
            return pre
        })
        browserHistory.push("/registro/second")
    }


    async componentWillUnmount() 
    {
        EventEmitter.emit('refreshInfo', this.state)
    }
    componentDidMount(){
        var value = localStorage.getItem("book");
        if (value) {
            
            console.log(value)
            this.setState({
                contract: value.contract,
            })
        }

    }

    render() {

        return (
            <div>


                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                        <div className="container">
                            <div className="active-cont visible-cont slide-cont">
                                <div className="row">
                                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12  text-center">
                                        <h1 className="main-title">¡Empecemos!</h1>
                                        <h4 className="subtitle">Escoge una alternativa</h4>
                                    </div>
                                    <div className="text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 ">
                                        <img src="/images/woman.jpg" className="img-circle person" />
                                    </div>
                                    <div className="col-md-6 col-lg-offset-1 col-lg-5">
                                        <div className="project ">
                                            <a id="conContrato" onClick={() => this.next("si")} >
                                                <figure>
                                                    <img src={"/images/01.png"} className="attachment-goarch-image-480x880-croped size-goarch-image-480x880-croped wp-post-image"
                                                        alt="" srcSet="" sizes="" />
                                                    <figcaption>
                                                        <div className="text-right content-hover float-right">
                                                            <h2> Tengo un contrato de arriendo firmado y vigente </h2>
                                                        </div>
                                                    </figcaption>
                                                </figure>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-5">
                                        <div className="project ">
                                            <a id="sinCcontrato" onClick={() => this.next("no")}>
                                                <figure>
                                                    <img src={"/images/02.png"} className="attachment-goarch-image-480x880-croped size-goarch-image-480x880-croped wp-post-image"
                                                        alt="" srcSet="" sizes="" />
                                                    <figcaption>
                                                        <div className="text-left content-hover  float-left">
                                                            <h2>Estoy por firmar un contrato de arriendo</h2>
                                                        </div>
                                                    </figcaption>
                                                </figure>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12  text-center">
                                        <h5>Acepto que voy a someter información para contratar un servicio que incluye un seguro de arriendo y que la información que
                                    proveo en este sitio debe ser correcta y verdadera.</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                
            </div>
        )
    }
}

export default FirstStep;
