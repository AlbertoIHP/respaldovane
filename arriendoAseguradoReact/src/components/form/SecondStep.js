import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import EventEmitter from "react-native-eventemitter";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GoogleMapReact from 'google-map-react';
import NumberFormat from 'react-number-format';



class SecondStep extends Component {
    static defaultProps = {
        center: { lat: -33.4429046, lng: -70.6560586},
        zoom: 8,
    };
    constructor(props) {
        super(props);
        this.state = { 
            property_type: '',
            address: '',
            comuna: '',
            region: '',
            tLng: '',
            center: {
                lat: props.center.lat,
                lng: props.center.lng
            },
            depto: '',
            onload: '',
            zoom: 8
        };
        this.updateStateAddress= this.updateStateAddress.bind(this);
        this.updateStateHome = this.updateStateHome.bind(this);
        this.updateDepto = this.updateDepto.bind(this);
        this.onChange = (address) => this.setState({ address })

    }

    

    componentWillMount() {
        var value = localStorage.getItem("book");
        var decoded = JSON.parse(value);
            if (value) {
            this.setState({
                property_type: decoded.property_type,
                address: decoded.address,
            })
        }

    }


    async componentWillUnmount() 
    {
        console.log("ME ESTOY DESTRUYENDO")
        EventEmitter.emit('refreshInfo', this.state )
    }


    
    handleFormSubmit = (event) => {
        event.preventDefault()

        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({
                    center: latLng,
                    zoom: 17

                })
                console.log(latLng)
            })
            .catch(error => console.error('Error', error))
        
    }
    

    updateStateAddress(e) {
        var updated_address = this.state.address;
        updated_address = e.target.value;
        this.setState({ address: updated_address });
        console.log(this.state.address)
    }
    updateDepto(e) {
        var updated = this.state.depto;
        updated = e.target.value;
        this.setState({
            depto: updated
        });
        console.log(this.state.depto)
    }
    updateStateHome(e){
        var updated_state = this.state.property_type;
        updated_state = e.target.value;
        this.setState({ property_type: updated_state })
        console.log(this.state.property_type)
    } 

    async next() {
        var valido = true;
        var error = '';
        if (this.state.property_type == '') {
            valido = false;
            error += "seleccione una opción. \n"
        }else if(this.state.property_type == "depto"){
            if (this.state.depto == "") {
                valido = false;
                error += "Ingrese número del departamento. \n"
            }
        }
        if (this.state.address == "") {
            valido = false;
            error += "Ingrese dirección. \n"
        }

        if (!valido) {
            alert(error);
            return;
        } else {
            browserHistory.push('/registro/third');
        }
    }

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
            placeholder: 'Ej: Cerro Colorado 5030, las Condes'
        }
        const options = {
            types: ['address'],
            componentRestrictions: {country: "cl"}
        }

        return (
            <div>
                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                    <div className="container">
                        <div className=" slide-cont">
                            <div className="row">
                                <div className="text-center col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                    <img src="/images/woman.jpg" className="img-circle person" style={{marginTop: '0px', marginBottom: '30px'}}/>
                                </div>
                                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 text-center">
                                    <h1 className="main-title">¡Genial! ¿Dónde queda la propiedad?</h1>
                                    <br/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <div className="form-group inputs-radio radio-center">
                                            <input type="radio" name="home" id="casa" value="casa" checked={this.state.property_type==="casa"} onChange={this.updateStateHome}/>
                                            <label htmlFor="casa" >Casa</label>
                                            <input type="radio" name="home" id="depto" value="depto" checked={this.state.property_type === "depto"} onChange={ this.updateStateHome}/>
                                            <label htmlFor="depto">Departamento</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 address_input" style={{zIndex: '10'}} >
                                        <form onSelect={this.handleFormSubmit} className="address_form">
                                            <PlacesAutocomplete inputProps={inputProps} options={options} value={this.state.address}/>
                                        </form>
                                    </div>
                                    <div className={this.state.property_type == 'depto' ? '' : 'hidden'}>
                                        <div className="col-lg-7 col-lg-offset-1 col-md-8 col-md-offset-0 col-sm-12">
                                            <div className="form-group">
                                                <input  type="text" className="form-control" placeholder="Número del departamento"  value={this.state.depto} onChange={ (e) => this.updateDepto(e)} />                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12">
                                        <div style={{ height: '300px', width: '100%', marginBottom: '20px' }}>
                                        <GoogleMapReact
                                            defaultCenter={this.state.center}
                                            defaultZoom={this.props.zoom}
                                            center={this.state.center}
                                            zoom={this.state.zoom}
                                        >
                                            <AnyReactComponent
                                                lat={this.state.center.lat}
                                                lng={this.state.center.lng}
                                            />
                                        </GoogleMapReact>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 text-center" style={{ zIndex: '1' }}>
                                    <button className="main-btn " onClick={ () => this.next()} >
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

export default SecondStep;



const AnyReactComponent = ({ text }) => <div>  <i className="fa fa-map-marker"></i> {text}</div>;
