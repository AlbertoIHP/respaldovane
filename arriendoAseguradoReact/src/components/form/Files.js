import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Dropzone from 'react-dropzone'
import EventEmitter from "react-native-eventemitter";
import Modal from './Modal';
import {BASE_URL} from '../Environment'


class Files extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onload: '',
            documents: '',
            first_file: null,
            second_file: null,
            files: [],
            varios: [],
            ocupation: '',
            first_encode: '',
            second_encode: '',
            quotation_id: ''
        }
        this.updateDocument = this.updateDocument.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.uploadSecondFile = this.uploadSecondFile.bind(this);
    }
    async componentWillMount(){
        console.log(this.props)
    }
    
    async componentDidMount() {
        var value = localStorage.getItem("book");
        var decoded = JSON.parse(value);
        if(value){
            await this.setState( pre => {
                pre.ocupation = decoded.ocupacion,
                pre.quotation_id = localStorage.getItem('quotation_id')
                return pre
            })
        }
    }
    async componentWillUnmount() {
        EventEmitter.emit('refreshInfo', this.state)
    }


   async onDrop(files) {
       var update = "";
       console.log(this.state.varios, "aqui va varios")
       var aux=[]
       for(var i = 0; i < files.length ; i++){
        var hartos = files[i]
        await this.getBase64(hartos, (result) => {
            update = result;
            aux.push(update)
            console.log("update estate", aux)
            if(i===files.length){
                this.setState({
                    files: files,
                    varios: aux
                });
            }
         });
       }

        console.log(this.state.files, this.state.varios);
    }
    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload =function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        return reader.result
    }

    async updateDocument(documents) {
        await this.setState({ documents: documents })
    }

// test ... asyn sacado
    async uploadFile(e) {
        var update_state = this.state.first_file;
        update_state = e.target.files[0];
        var update = ""
        await this.getBase64(update_state, (result) => {
            update = result;
             this.setState({
                 first_file: update_state,
                 first_encode: update
             });
        });
    }
    async uploadSecondFile(e) {
       var update_state = this.state.first_file;
       update_state = e.target.files[0];
       var update = ""
       await this.getBase64(update_state, (result) => {
           update = result;
           this.setState({
               second_file: update_state,
               second_encode: update
           });
       });
    }
    
    
    async next() {
        var valido = true;
        var error = '';
        if (this.state.files.length == 0) {
            valido = false;
            error += "Agregue los documentos solicitados. \n"
        }
        if (!valido) {
            alert(error);
            return;
        }
        else {
            var first = this.state.first_encode;
            var second = this.state.second_encode;
            // var varios = this.state.files;
            var third = this.state.varios
            var quotation = this.state.quotation_id
            console.log(third)
            var form = new FormData();
            form.append('first_file', first);
            form.append('second_file', second);
            form.append('quotation_id', quotation);
            form.append('files',JSON.stringify(third));
            
            console.log(first)
            var miInit = {
                headers: {
                    "Accept": "application/json",
                    "type": "formData"
                },
                method: 'POST',
                body: form
            }

            var myUrl = new Request(BASE_URL + '/api/v1/documents', miInit);
            fetch(myUrl)
                .then(function (response) {
                    return response.json()

                })
                .then(json => {
                    console.log(json)
                    if (json.error) {
                        alert(json.message)
                    } else {
                        
                    }
                    
                });
                
            browserHistory.push('/registro/last');
            localStorage.removeItem("book")
        }
       
    }

    render() {
        let dependiente =   <div className="col-md-12">
                                <h4 className="subtitle">Trabajador dependiente o jubilado</h4>
                                <br />
                                <div className="tag-document" onClick={() => this.updateDocument("1")}>
                                    <h4> Certificado de empleador que acredite antigüedad superior a 6 meses. </h4>
                                    <div className={this.state.documents == '1' ? 'fadeInDown animated ' : 'hidden'}>
                                        <div className="content">
                                            { 
                                                this.state.first_file == null ? <p> Nombre del documento</p> :
                                                <p>
                                                    { this.state.first_file.name}
                                                </p> 
                                            }
                                            <div className="cont-button">
                                                <button className="false-btn main-btn" >Cargar</button>
                                                <input type="file" onChange={this.uploadFile}/>
                                            </div>
                                            <a className="main-link" onClick={() => this.refs.child.showModal()}>Ver ejemplo</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="tag-document" onClick={() => this.updateDocument("2")}>
                                    <h4>4 Últimas liquidaciones de sueldo</h4>
                                    <div className={this.state.documents == '2' ? 'fadeInDown animated ' : 'hidden'}>
                                        <div className="content"> 
                                            { 
                                                this.state.files.length == 0 ? <p> Nombre del documento</p> :
                                                <ul>
                                                    { this.state.files.map(f => <li key={f.name}>{f.name} </li>) }
                                                </ul> 
                                            }
                                            <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)} style={{height: "100px", width: "100px", border: "2px dashed #999"}}>
                                                <h6>Selecciona y suelta aquí los documentos.</h6>
                                            </Dropzone>
                                            <a className="main-link" onClick={() => this.refs.child.showModal()}>Ver ejemplo</a>
                                        </div>
                                        <h5>(la renta de arrendamiento mensual no puede ser superior al 30%)</h5>
                                    </div>
                                </div>
                            </div>
            let independiente = <div className="col-md-12">
                                    <h4 className="subtitle">Trabajador independiente</h4>
                                    <br/>
                                    <div className="tag-document" onClick={() => this.updateDocument("1")}>
                                        <h4> Certificado de empleador que acredite antigüedad superior a 6 meses. </h4>
                                        <div className={this.state.documents == '1' ? 'fadeInDown animated ' : 'hidden'}>
                                            <div className="content">
                                                { 
                                                    this.state.first_file == null ? <p> Nombre del documento</p> :
                                                    <p>
                                                        { this.state.first_file.name}
                                                    </p> 
                                                }
                                                <div className="cont-button">
                                                    <button className="false-btn main-btn" >Cargar</button>
                                                    <input type="file" onChange={this.uploadFile}/>
                                                </div>
                                                <a className="main-link" onClick={() => this.refs.child.showModal()}>Ver ejemplo</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tag-document" onClick={() => this.updateDocument("2")}>
                                        <h4>3 Últimas declaraciones de renta</h4>
                                        <div className={this.state.documents == '2' ? 'fadeInDown animated ' : 'hidden'}>
                                            <div className="content"> 
                                                { 
                                                    this.state.files.length == 0 ? <p> Nombre del documento</p> :
                                                    <ul>
                                                        { this.state.files.map(f => <li key={f.name}>{f.name} </li>) }
                                                    </ul> 
                                                }
                                                <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)} style={{height: "100px", width: "100px", border: "2px dashed #999"}}>
                                                    <h6>Selecciona y suelta aquí los documentos.</h6>
                                                </Dropzone>
                                                <a className="main-link" onClick={() => this.refs.child.showModal()}>Ver ejemplo</a>
                                            </div>
                                            <h5>(la renta de arrendamiento mensual no puede ser superior al 30%)</h5>
                                        </div>
                                    </div>
                                    <div className="tag-document" onClick={() => this.updateDocument("3")}>
                                        <h4>Balance 31 de diciembre (año anterior)</h4>
                                        <div className={this.state.documents == '3' ? 'fadeInDown animated ' : 'hidden'}>
                                            <div className="content">
                                                { 
                                                    this.state.second_file == null ? <p> Nombre del documento</p> :
                                                    <p>
                                                        { this.state.second_file.name}
                                                    </p> 
                                                }
                                                <div className="cont-button">
                                                    <button className="false-btn main-btn" >Cargar</button>
                                                    <input type="file" onChange={this.uploadSecondFile} />
                                                </div>
                                                <a className="main-link" onClick={() => this.refs.child.showModal()}>Ver ejemplo</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        let extranjero = <div className="col-md-12">
                            <h4 className="subtitle">Extranjero</h4>
                            <br />
                            <div className="tag-document" onClick={() => this.updateDocument("3")}>
                                <h4>Certificado de permanencia</h4>
                                <div className={this.state.documents == '3' ? 'fadeInDown animated ' : 'hidden'}>
                                    <div className="content">
                                        { 
                                            this.state.first_file == null ? <p> Nombre del documento</p> :
                                            <p>
                                                { this.state.first_file.name}
                                            </p> 
                                        }
                                        <div className="cont-button">
                                            <button className="false-btn main-btn" >Cargar</button>
                                            <input type="file" onChange={this.uploadFile} />
                                        </div>
                                        <a className="main-link" onClick={() => this.refs.child.showModal()}>Ver ejemplo</a>
                                    </div>
                                </div>
                            </div>
                            <div className="tag-document" onClick={() => this.updateDocument("1")}>
                                <h4> Certificado de empleador que acredite antigüedad superior a 6 meses. </h4>
                                <div className={this.state.documents == '1' ? 'fadeInDown animated ' : 'hidden'}>
                                    <div className="content">
                                        { 
                                            this.state.second_file == null ? <p> Nombre del documento</p> :
                                            <p>
                                                { this.state.second_file.name}
                                            </p> 
                                        }
                                        <div className="cont-button">
                                            <button className="false-btn main-btn" >Cargar</button>
                                            <input type="file" onChange={this.uploadSecondFile}/>
                                        </div>
                                        <a className="main-link" onClick={() => this.refs.child.showModal()}>Ver ejemplo</a>
                                    </div>
                                </div>
                            </div>
                            <div className="tag-document" onClick={() => this.updateDocument("2")}>
                                <h4>4 Últimas liquidaciones de sueldo</h4>
                                <div className={this.state.documents == '2' ? 'fadeInDown animated ' : 'hidden'}>
                                    <div className="content"> 
                                        { 
                                            this.state.files.length == 0 ? <p> Nombre del documento</p> :
                                            <ul>
                                                { this.state.files.map(f => <li key={f.name}>{f.name} </li>) }
                                            </ul> 
                                        }
                                        <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)} style={{height: "100px", width: "100px", border: "2px dashed #999"}}>
                                            <h6>Selecciona y suelta aquí los documentos.</h6>
                                        </Dropzone>
                                        <a className="main-link" onClick={() => this.refs.child.showModal()}>Ver ejemplo</a>
                                    </div>
                                    <h5>(la renta de arrendamiento mensual no puede ser superior al 30%)</h5>
                                </div>
                            </div>
                        </div>


        let content =   <div className="modal-content text-center">
                            <img src={"/images/documents.png"} style={{width: '200px', marginTop: '30px'}} />
                        </div> 
        
        return (
            <div>
                <section className={this.state.onload == 'true' ? 'selection' : ' fadeInRight animated selection'} >
                    <div className="container">
                        <div className=" slide-cont ">
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-md-offset-0 col-sm-12 ">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h1 className="main-title">Necesitamos algunos documentos</h1>
                                        <h4 className="subtitle">Puedes cargarlos ahora o después desde el administrador</h4>
                                    </div>
                                    <div className="text-center col-md-12">
                                        <img src="/images/woman.jpg" className="img-circle person" />
                                    </div>
                                </div>
                                <div className="row">
                                    {this.props.location.state.ocupation == 'dependiente' ? dependiente : null }
                                    {this.props.location.state.ocupation == 'independiente' ? independiente : null}
                                    {this.props.location.state.ocupation == 'extranjero' ? extranjero : null}
                                </div>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <button className="main-btn " type="submit" onClick={() => this.next()} >
                                            <i className="fa fa-send"></i>
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Modal ref="child" content={content} />
            </div>
        )
    }
}

export default Files;
