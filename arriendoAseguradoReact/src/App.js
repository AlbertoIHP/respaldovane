import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import Main from './components/layout/Main';
import Home from './components/home/Home';
import FirstStep from './components/form/FirstStep';
import SecondStep from './components/form/SecondStep';
import ThirdStep from './components/form/ThirdStep';
import FourthStep from './components/form/FourthStep';
import FifthStep from './components/form/FifthStep';
import SixthStep from './components/form/SixthStep';
import SeventhStep from './components/form/SeventhStep';
import EighthStep from './components/form/EighthStep';
import NinethStep from './components/form/NinethStep';
import TenthStep from './components/form/TenthStep';
import Files from './components/form/Files';
import LastStep from './components/form/LastStep';
import EventEmitter from 'react-native-eventemitter';
import AdminContainer from './components/admin/AdminContainer';
import PropietaryContainer from './components/propietary/PropietaryContainer';
import LessorContainer from './components/lessor/LessorContainer';

import {BASE_URL} from './components/Environment'

class App extends Component {

  constructor( props )
  {
    super( props )
    this.state = 
    {
      contract: '',
      property_type:'',
      depto: '',
      address: '',
      region: '',
      comuna: '',
      monthly_price: '',
      type_money: '',
      rent_tenant: '',
      plan: '',
      name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      owner_name: '',
      owner_last: '',
      owner_email: '',
      owner_phone: '',
      owner_rut: '' ,
      contract_initDate: '',
      term: '',
      pay_day: '',
      amount: '',
      unit_type: '',
      penalty: '',
      penalty_type: '',
      automatic_renewal: '',
      lessor_name: '',
      lessor_last: '',
      lessor_email: '', 
      lessor_phone: '', 
      lessor_rut: '', 
      ocupacion: '',
      conditions: '',
      propietary_info: '',
      quotation_id:'',
      first_file: '',
      second_file: '',
      files: [],
    }
  }


  componentWillUnmount(){
    console.log("i am dead")
  }
  
  async componentDidMount()
  {
    EventEmitter.on('refreshInfo', async (info) => {
      info.contract ? await this.refreshContract( info.contract ) : null
      info.address ? await this.refreshNewAddress( info.address ) : null
      info.depto ? await this.refreshNewDepto(info.depto) : null
      info.property_type ? await this.refreshNewHome(info.property_type) : null
      info.monthly_price ? await this.refreshNewPrice(info.monthly_price) : null
      info.type_money ? await this.refreshNewMoney(info.type_money) : null
      info.rent_tenant ? await this.refreshNewRent(info.rent_tenant) : null
      info.plan ? await this.refreshNewPlan(info.plan) : null
      info.name ? await this.refreshNewName(info.name) : null
      info.last_name ? await this.refreshNewLast(info.last_name) : null
      info.phone ? await this.refreshNewPhone(info.phone) : null
      info.email ? await this.refreshNewEmail(info.email) : null
      info.password ? await this.refreshNewPassword(info.password) : null
      info.owner_name ? await this.refreshNewOwnerName(info.owner_name) : null
      info.owner_phone ? await this.refreshNewOwnerPhone(info.owner_phone) : null
      info.owner_last ? await this.refreshNewOwnerLast(info.owner_last) : null
      info.owner_email ? await this.refreshNewOwnerEmail(info.owner_email) : null
      info.owner_rut ? await this.refreshNewOwnerRut(info.owner_rut) : null
      info.contract_initDate ? await this.refreshNewInitDate(info.contract_initDate) : null
      info.term ? await this.refreshNewTerm(info.term) : null
      info.pay_day ? await this.refreshNewDay(info.pay_day) : null
      info.amount ? await this.refreshNewAmount(info.amount) : null
      info.unit_type ? await this.refreshNewUnitType(info.unit_type) : null
      info.penalty ? await this.refreshNewPenalty(info.penalty) : null
      info.penalty_type ? await this.refreshNewPenaltyType(info.penalty_type) : null
      info.automatic_renewal ? await this.refreshNewRenewal(info.automatic_renewal) : null
      info.lessor_name ? await this.refreshNewLessorName(info.lessor_name) : null
      info.lessor_last ? await this.refreshNewLessorLast(info.lessor_last) : null
      info.lessor_phone ? await this.refreshNewLessorPhone(info.lessor_phone) : null
      info.lessor_email ? await this.refreshNewLessorEmail(info.lessor_email) : null
      info.lessor_rut ? await this.refreshNewLessorRut(info.lessor_rut) : null
      info.ocupacion ? await this.refreshNewOcupacion(info.ocupacion) : null
      info.first_file ? await this.refreshNewFirstFile(info.first_file) : null

      await localStorage.setItem('book', JSON.stringify(this.state) )
      
    } )

    EventEmitter.on('registerUser', async (user) => {
      console.log("me traje los datos", user);
      await this.setState(user, ()=> {
      
        var data = this.state;

        var form = new FormData();
        form.append('formData', JSON.stringify(data) );

        var miInit = {

            method: 'POST',
            body: form
        }

        var myRequest = new Request(BASE_URL+'/api/v1/create_request', miInit);

        fetch(myRequest)
          .then(function (response) {
                return response.json()

          })
          .then(json => {
            console.log(json)
            if (json.error) {
              alert(json.message)
            }else{
              localStorage.setItem('quotation_id', json.quotation_id)
              browserHistory.push('/registro/eighth');
            }

          });
      } )
    })


    EventEmitter.on('createContract', async (contract) => {
      console.log("me traje los datos del contrato", contract);
      await this.setState(contract, () => {

      
        var data = this.state;

        var form = new FormData();
        form.append('formData', JSON.stringify(data));

        var miInit = {
          method: 'POST',
          body: form
        }

        var myRequest = new Request(BASE_URL+'/api/v1/create_contract', miInit);

        fetch(myRequest)
          .then(function (response) {
            return response.json()

          })
          .then(json => {
            console.log(json)
            if (json.error) {
              alert(json.message)
            } else {
              
              '/registro/files', { ocupation: this.state.ocupacion }
                browserHistory.push({pathname: '/registro/files', state: { ocupation: this.state.ocupacion }});
            }

          });
      }
    
    
    )
    })

    EventEmitter.on('getUser', () => {
      console.log("esto es lo que hay", this.state)
      EventEmitter.emit('sendUser', (this.state))
    })
  }
  

  async refreshContract( contract )
  {
    await this.setState( pre => {
      pre.contract = contract
      return pre
    })
  }
  async refreshNewAddress( newAddress )
  {
    await this.setState ( pre => {
      pre.address = newAddress
      return pre
    })
  }
  async refreshNewDepto(newDepto) {
    await this.setState(pre => {
      pre.depto = newDepto
      return pre
    })
  }
  async refreshNewHome(newProperty) {
    await this.setState(pre => {
      pre.property_type = newProperty
      return pre
    })
  }
  async refreshNewPrice(newPrice) {
    await this.setState(pre => {
      pre.monthly_price = newPrice
      return pre
    })
  }
  async refreshNewMoney(newMoney) {
    await this.setState(pre => {
      pre.type_money = newMoney
      return pre
    })
  }
  async refreshNewRent(newRent) {
    await this.setState(pre => {
      pre.rent_tenant= newRent
      return pre
    })
  }
  async refreshNewPlan(newPlan) {
    await this.setState(pre => {
      pre.plan = newPlan
      return pre
    })
  }
  async refreshNewName(newName) {
    await this.setState(pre => {
      pre.name= newName
      return pre
    })
  }
  async refreshNewLast(newLast) {
    await this.setState(pre => {
      pre.last_name = newLast
      return pre
    })
  }
  async refreshNewPhone(newPhone) {
    await this.setState(pre => {
      pre.phone = newPhone
      return pre
    })
  }
  async refreshNewEmail(newEmail) {
    await this.setState(pre => {
      pre.email = newEmail
      return pre
    })
  }
  async refreshNewPassword(newPassword) {
    await this.setState(pre => {
      pre.password = newPassword
      return pre
    })
  }
  async refreshNewOwnerName(newOwnerName) {
    await this.setState(pre => {
      pre.owner_name = newOwnerName
      return pre
    })
  }
  async refreshNewOwnerLast(newOwnerLast) {
    await this.setState(pre => {
      pre.owner_last = newOwnerLast
      return pre
    })
  }
  async refreshNewOwnerPhone(newOwnerPhone) {
    await this.setState(pre => {
      pre.owner_phone = newOwnerPhone
      return pre
    })
  }
  async refreshNewOwnerEmail(newOwnerEmail) {
    await this.setState(pre => {
      pre.owner_email = newOwnerEmail
      return pre
    })
  }
  async refreshNewOwnerRut(newOwnerRut) {
    await this.setState(pre => {
      pre.owner_rut = newOwnerRut
      return pre
    })
  }
  async refreshNewInitDate(newInitDate) {
    await this.setState(pre => {
      pre.contract_initDate= newInitDate
      return pre
    })
  }
  async refreshNewTerm(newTerm) {
    await this.setState(pre => {
      pre.term = newTerm
      return pre
    })
  }
  async refreshNewDay(newDay) {
    await this.setState(pre => {
      pre.pay_day = newDay
      return pre
    })
  }
  async refreshNewAmount(newAmount) {
    await this.setState(pre => {
      pre.amount = newAmount
      return pre
    })
  }
  async refreshNewUnitType(newUnitType) {
    await this.setState(pre => {
      pre.unit_type = newUnitType
      return pre
    })
  }
  async refreshNewPenalty(newPenalty) {
    await this.setState(pre => {
      pre.penalty = newPenalty
      return pre
    })
  }
  async refreshNewPenaltyType(newPenaltyType) {
    await this.setState(pre => {
      pre.penalty_type = newPenaltyType
      return pre
    })
  }
  async refreshNewRenewal(newRenewal) {
    await this.setState(pre => {
      pre.automatic_renewal = newRenewal
      return pre
    })
  }
  async refreshNewLessorName(newLessorName) {
    await this.setState(pre => {
      pre.lessor_name = newLessorName
      return pre
    })
  }
  async refreshNewLessorLast(newLessorLast) {
    await this.setState(pre => {
      pre.lessor_last = newLessorLast
      return pre
    })
  }
  async refreshNewLessorPhone(newLessorPhone) {
    await this.setState(pre => {
      pre.lessor_phone = newLessorPhone
      return pre
    })
  }
  async refreshNewLessorEmail(newLessorEmail) {
    await this.setState(pre => {
      pre.lessor_email = newLessorEmail
      return pre
    })
  }
  async refreshNewLessorRut(newLessorRut) {
    await this.setState(pre => {
      pre.lessor_rut = newLessorRut
      return pre
    })
  }
  async refreshNewOcupacion(newOcupacion) {
    await this.setState(pre => {
      pre.ocupacion = newOcupacion
      return pre
    })
  }
  async refreshNewFirstFile(first){
    await this.setState(pre => {
      pre.first_file = first
      return pre
    })
  }

  render() 
  {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Main} >
          <IndexRedirect to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/registro" component={FirstStep} />
          <Route path="/registro/second" component={SecondStep} />
          <Route path="/registro/third" component={ThirdStep} />
          <Route path="/registro/fourth" component={FourthStep} />
          <Route path="/registro/fifth" component={FifthStep} />
          <Route path="/registro/sixth" component={SixthStep} />
          <Route path="/registro/seventh" component={SeventhStep} />
          <Route path="/registro/eighth" component={EighthStep} />
          <Route path="/registro/nineth" component={NinethStep} />
          <Route path="/registro/tenth" component={TenthStep} />
          <Route path="/registro/files" component={Files} />
          <Route path="/registro/last" component={LastStep} />
        </Route>
        <Route path="/admin" component={AdminContainer} />
        <Route path="/propietarios" component={PropietaryContainer} />
        <Route path="/arrendatarios" component={LessorContainer} />

      </Router> 
    );

  }
}

export default App;
