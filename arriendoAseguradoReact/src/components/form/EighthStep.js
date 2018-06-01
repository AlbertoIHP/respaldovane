import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import EventEmitter from "react-native-eventemitter";
import NumberFormat from 'react-number-format';



class EighthStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select_option: '', owner_name: '', owner_last: '', owner_email: '', owner_phone: '', owner_rut: '', user: '', value: '', decoded: '', onload: ''
        }
        this.updateStatePersonName = this.updateStatePersonName.bind(this);
        this.updateStatePersonLastName = this.updateStatePersonLastName.bind(this);
        this.updateStatePersonEmail = this.updateStatePersonEmail.bind(this);
        this.updateStatePersonPhone = this.updateStatePersonPhone.bind(this);
        this.updateStatePersonRut = this.updateStatePersonRut.bind(this);
        this.updateStateSelect = this.updateStateSelect.bind(this);

    }
    async componentDidMount() {
        EventEmitter.on('sendUser', (data) => {
            console.log("Me llego el usuario", data)
            this.setState({user: data})
            console.log(this.state.user)

        })
        EventEmitter.emit('getUser', this.state)

    }

    async componentWillUnmount() {
        EventEmitter.emit('refreshInfo', this.state)
       
    }

    async updateStateSelect(e) 
    {
        var update_state = this.state.select_option;
        update_state = e.target.value;
        let value = localStorage.getItem("book");
        let decoded = JSON.parse(value);

        await this.setState(pre => {
            pre.select_option = update_state
            return pre
        })
        console.log(decoded)
        if (value) {

            if (this.state.select_option == 'me') {
                this.setState({
                    owner_name: decoded.name,
                    owner_last: decoded.last_name,
                    owner_email: decoded.email,
                    owner_phone: decoded.phone,
                })
            }
            else {
                this.setState({
                    owner_name: '',
                    owner_last: '',
                    owner_email: '',
                    owner_phone: ''
                })
            }
        }
    }

    updateStatePersonName(e){
        var update_state = this.state.owner_name;
        update_state = e.target.value;
        this.setState({ owner_name: update_state });
        console.log(this.state.owner_name)
    }
    updateStatePersonLastName(e) {
        var update_state = this.state.owner_last;
        update_state = e.target.value;
        this.setState({ owner_last: update_state });
        console.log(this.state.owner_last)
    }
    updateStatePersonEmail(e) {
        var update_state = this.state.owner_email;
        update_state = e.target.value;
        this.setState({ owner_email: update_state });
        console.log(this.state.owner_email)
    }
    updateStatePersonPhone(e) {
        var updated = this.state.owner_phone;
        updated = e.target.value;
        this.setState({ owner_phone: updated });
        console.log(this.state.owner_phone)
    }
    updateStatePersonRut(e) {
        var update_state = this.state.owner_rut;
        update_state = e.target.value;
        this.setState({ owner_rut: update_state });
        console.log(this.state.owner_rut)
    }

    async next() {
        var valido = true;
        var error = '';
        var phone = this.state.owner_phone.split(' ').join("");
        if (this.state.select == '') {
            valido = false;
            error += "Seleccione una opción. \n"
        }
        if (this.state.owner_name == '') {
            valido = false;
            error += "Ingrese nombre del propietario. \n"
        }
        if (this.state.owner_last == "") {
            valido = false;
            error += "Ingrese El apellido del propietario. \n"
        }
        if (this.state.owner_email == "") {
            valido = false;
            error += "Ingrese correo electrónico del propietario. \n";
        }else {
            var email = this.state.owner_email;
            var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regExpEmail.test(email)) {
                valido = false;
                error += 'El Email debe contener el formato correcto.\n';
            }
        }
        if (phone.length !== 12 ) {
            valido = false;
            error += "Ingrese el número del propietario. \n"
        }
        if (this.state.owner_rut == "") {
            valido = false;
            error += "Ingrese el rut del propietario. \n"
        }

        if (!valido) {
            alert(error);
            return;
        }
        else {
            browserHistory.push('/registro/nineth');
        }     
    }
    back() {
        browserHistory.push('/registro/seventh');
    }

    render() {

        return (
            <div>
                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                    <div className="container">
                        <div className=" slide-cont">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 ">
                                <div className="row">
                                    <div className="text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <h1 className="main-title">¡Gusto saludarte <span className="sustantivo_propio">{this.state.user.name} {this.state.user.last_name}</span>! </h1>
                                        <h4 className="subtitle">  ¿A nombre de quién se tomará la póliza del seguro de arriendo?</h4>
                                        
                                    </div>
                                    <div className=" text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <img src="/images/woman.jpg" className="img-circle person" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-lg-5 col-lg-offset-1">
                                        <div className="form-group inputs-radio" >
                                            <input type="radio" name="person" id="me" value="me"  onClick={(e) =>this.updateStateSelect(e)}/>
                                            <label htmlFor="me">Yo</label>
                                            <input type="radio" name="person" id="other" value="other" onClick={(e) =>this.updateStateSelect(e)} />
                                            <label htmlFor="other">Otra persona</label>
                                        </div>
                                        <div className="form-group">
                                            <label > Nombre </label>
                                            <input type="text" className="form-control" name="" onChange={this.updateStatePersonName} value={this.state.owner_name}/>
                                        </div>
                                        <div className="form-group">
                                            <label > Apellido </label>
                                            <input type="text" className="form-control" name="last_nameAval" onChange={this.updateStatePersonLastName} value={this.state.owner_last}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-5">
                                        <div className="form-group">
                                            <label > Correo Electrónico</label>
                                            <input type="email" className="form-control" name="emailAval" onChange={this.updateStatePersonEmail} value={this.state.owner_email} />
                                        </div>
                                        <div className="form-group">
                                            <label >Teléfono</label>
                                            <NumberFormat className="form-control"  value={this.state.owner_phone} format="+569 #### ####" onBlur={this.updateStatePersonPhone} />    
                                        </div>
                                        <div className="form-group">
                                            <label >Rut</label>
                                            <input type="text" className="form-control" name="rutAval" onChange={this.updateStatePersonRut} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <button className="main-btn "  onClick={() => this.next()}>
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

export default EighthStep;
