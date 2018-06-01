import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import EventEmitter from "react-native-eventemitter";



class LastStep extends Component {
    constructor(props) {
        super(props);
        this.state={
            user: '',
            onload: ''
        }
    }
    async componentDidMount() {
        EventEmitter.on('sendUser', (data) => {
            console.log("Me llego el usuario", data)
            this.setState({ user: data })
            console.log(this.state.user)

        })
        EventEmitter.emit('getUser', this.state)


    }
    toHome(){
        browserHistory.push('/home');
    }
    
    render() {

        return (
            <div>
                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                    <div className="container">
                        <div className=" slide-cont ">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h1 className="main-title">¡Muchas Gracias <span className="sustantivo_propio">{this.state.user.name} {this.state.user.last_name}!</span></h1>
                                    <h4 className="subtitle"> Revisaremos la información y nos pondremos en contacto contigo a la brevedad.</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-12 text-center">
                                    <img src="/images/work.png" alt="" style={{ width: '150px;' }} className="img-responsive" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <button className="main-btn " type="submit" onClick={() => this.toHome()} >
                                    <i className="fa fa-home"></i>Volver al inicio</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default LastStep;
