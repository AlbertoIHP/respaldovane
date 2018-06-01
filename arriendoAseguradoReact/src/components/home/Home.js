import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Footer from "../layout/Footer";
import Modal from '../form/Modal';
import Carousel from 'nuka-carousel';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slideIndex: 1,
            usuario: ''
        }
        this.transitionEffect = this.transitionEffect.bind(this)
        this.resetState = this.resetState.bind(this)
    }
    toRegister(e){
        e.preventDefault();
        browserHistory.push('/registro');
        
    }
    resetState(e){
        e.stopPropagation();
         this.setState({
             usuario: ''
         })
         console.log(this.state.usuario)
    }
    transitionEffect(type){
         this.setState({
             usuario: type
         })
         console.log(this.state.usuario)
    }

    render() {
        let content =   <div className="modal-content text-center">
                            <img src={"/images/documents.png"} style={{width: '200px', marginTop: '30px'}} />
                        </div> 
        return (
            <div>
                <section id="main-slider" className="main-slider">
                    
                    <div className="back-1">
                        <div className="pointer"></div> 
                    </div>
                    <div className="back-2">
                        <div className="pointer"></div> 
                    </div>
                    <div className="text text-center">
                        <h1>Tu arriendo,<br/> tu tranquilidad.</h1>
                       <h4> Asegura tu arriendo, cotiza de forma gratuita y rápida</h4>
                        <a href=""  className="main-btn" onClick={ this.toRegister} > Obten tu cotización </a>
                        <p className="main-link" onClick={() => this.refs.child.showModal()} >  <img src={"/images/play.png"} style={{width: '28px'}} /> Ver video  </p>
                    </div>
                </section>
                <Modal ref="child" content={content} />
                
                <section className="brands" style={{backgroundColor: '#eee'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 text-center">
                                <div className="media-flex">
                                    <div className="media-body" style={{ verticalAlign: 'middle'}}>
                                        <h4 className="media-heading" style={{fontSize: '22px', marginTop: '0px'}}>Ellos son nuestros aliados</h4>
                                    </div>
                                    <div className="media-left" style={{marginTop: '0px' }} >
                                        <img src={"/images/hdi.png"} className="" />
                                        <img src={"/images/bci.png"} className="" />
                                        <img src={"/images/legal.png"} className="" />
                                        <img src={"/images/servipag.png"} className=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="intro"  style={{backgroundColor: '#f7f7f7'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 text-center">
                                <h1 className="main-title">This is a title.</h1>
                                <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam cumque debitis in dicta laborum. Dicta distinctio id odio aperiam recusandae nobis consectetur, totam sunt quis pariatur ullam minima. Numquam, aspernatur!</h4>
                            </div>
                        </div>
                    </div>
                </section>
                
                 <section className="users-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 text-center">

                                <div className="cont_users">
                                    <div className={this.state.usuario == 'propietario' ? 'cont-propietario active ' : 'cont-propietario'} onClick={() => this.transitionEffect('propietario')}>
                                        <div className="text">
                                            <h3>Vive tranquilo, te tenemos cubierto</h3>
                                            <div className="media">
                                                <div className="media-left">
                                                    <img src={"/images/placeholder.png"} className="media-object" />
                                                </div>
                                                <div className="media-body">
                                                    <h4 className="media-heading">Checkeo Arrendatario</h4>
                                                    <p>Revisamos los antecedentes de tu arrendatario para asegurarnos que tu propiedad esta en buenas manos</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="media-left">
                                                    <img src={"/images/placeholder.png"} className="media-object" />
                                                </div>
                                                <div className="media-body">
                                                    <h4 className="media-heading">Checkeo Arrendatario</h4>
                                                    <p>Revisamos los antecedentes de tu arrendatario para asegurarnos que tu propiedad esta en buenas manos</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="media-left">
                                                    <img src={"/images/placeholder.png"} className="media-object" />
                                                </div>
                                                <div className="media-body">
                                                    <h4 className="media-heading">Checkeo Arrendatario</h4>
                                                    <p>Revisamos los antecedentes de tu arrendatario para asegurarnos que tu propiedad esta en buenas manos</p>
                                                </div>
                                            </div>
                                            <button className="main-btn" onClick={this.resetState.bind(this)}> Back</button>
                                        </div>
                                        <figure >
                                            <h3>Beneficios <br/> Propietario</h3>
                                            <img src={"/images/propietario.png"}  onClick={this.resetState.bind(this)} />
                                        </figure>
                                    </div>
                                    <div className={this.state.usuario == 'arrendatario' ? 'cont-arrendatario active' : ' cont-arrendatario'} onClick={() => this.transitionEffect('arrendatario')}>
                                        <figure >
                                            <h3>Beneficios <br/>  Arrendatario</h3>
                                            <img src={"/images/arrendatario.png"} onClick={this.resetState.bind(this)} />
                                        </figure>
                                        <div className="text">
                                            <h3>Vive tranquilo, te tenemos cubierto</h3>
                                            <div className="media">
                                                <div className="media-left">
                                                    <img src={"/images/placeholder.png"} className="media-object" />
                                                </div>
                                                <div className="media-body">
                                                    <h4 className="media-heading">Checkeo Arrendatario</h4>
                                                    <p>Revisamos los antecedentes de tu arrendatario para asegurarnos que tu propiedad esta en buenas manos</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="media-left">
                                                    <img src={"/images/placeholder.png"} className="media-object" />
                                                </div>
                                                <div className="media-body">
                                                    <h4 className="media-heading">Checkeo Arrendatario</h4>
                                                    <p>Revisamos los antecedentes de tu arrendatario para asegurarnos que tu propiedad esta en buenas manos</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="media-left">
                                                    <img src={"/images/placeholder.png"} className="media-object" />
                                                </div>
                                                <div className="media-body">
                                                    <h4 className="media-heading">Checkeo Arrendatario</h4>
                                                    <p>Revisamos los antecedentes de tu arrendatario para asegurarnos que tu propiedad esta en buenas manos</p>
                                                </div>
                                            </div>
                                            <button className="main-btn" onClick={this.resetState.bind(this)}> Back</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-detail">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0  section-main">
                                <div className="media">
                                    <div className="media-left" style={{ textAlign: 'left' }}>
                                        <img src={"/images/placeholder.png"} className="media-object" style={{ margin: 'initial' }}/>
                                    </div>
                                    <div className="media-body">
                                        <h3 className="media-heading">Plataforma online</h3>
                                        <p>Nos interesa tu comodidad y que uses tu tiempo en lo que más te importa. Todo nuestro proceso es en línea, para que puedas hacerlos desde tu casa u oficina.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0  section-main">
                                <div className="media">
                                    <div className="media-body">
                                        <h3 className="media-heading">Nos preocupamos por ti</h3>
                                        <p>No somos una empresa tradicional. En caso de siniestro (no pago de arriendo) te ayudaremos a que recuperes tu propiedad lo antes posible y cubriremos los meses impagos de arriendo. Sabemos que cuentas con estos ingresos.</p>
                                    </div>
                                    <div className="media-left" style={{ textAlign: 'right' }}>
                                        <img src={"/images/placeholder.png"} className="media-object" style={{ margin: 'initial', float: 'right' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0  section-main">
                                <div className="media" style={{ borderBottom: '1px solid transparent' }}>
                                    <div className="media-left" style={{ textAlign: 'left' }}>
                                        <img src={"/images/placeholder.png"} className="media-object" style={{ margin:'initial' }} />
                                    </div>
                                    <div className="media-body">
                                        <h3 className="media-heading"> La mejor alternativa del mercado</h3>
                                        <p>Hasta 40% más económico que otras alternativas de administración de propiedades que ni siquiera incluyen seguro de arriendo y asesoría legal completa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="respaldo" style={{backgroundColor: '#f7f7f7'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0  text-center">
                                <h6>BACKED BY</h6> 
                                <h2 className="main-title">Some text here</h2>
                                <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.Nemo, eaque eius facere unde labore magni omnis esse aperiam iure aspernatur, vitae illum culpa aliquam.Est, delectus aliquid.Animi, totam officia!</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default Home;
