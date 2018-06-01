// in src/posts.js
import React, { Component } from 'react';
import { List, Datagrid, TextField, DateField, BooleanField, ShowButton, Show, SimpleShowLayout, ReferenceField } from 'admin-on-rest';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import AmountCard from './custom/AmountCard';
import PayButton from './PayOrder'
import Alert from './custom/Alert';
import { BASE_URL } from '../Environment';

export class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { locations: [], noAccount: false, paymentPending:false, monthTotal:0 }
  }


  componentDidMount() {
    var misCabeceras = new Headers();
    misCabeceras.append('Authorization', 'Bearer ' + localStorage.getItem('propietarytoken'))

    var miInit = {
      method: 'POST',
      headers: misCabeceras
    }
    
    var myRequest = new Request(BASE_URL + '/api/v1/propietary_dashboard', miInit);

    fetch(myRequest)
      .then(function (response) {
        return response.json()
      })
      .then(json => {
        this.setState(json);
      });
  }



  render() {
    const { myOwnProp, ...otherProps } = this.props;


    const datagrid = (<List title="Últimos Pagos" {...this.props} style={styles.welcome}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="price" label="Monto" />
        <TextField source="state" label="Estado" />
        <DateField source="date" label="Fecha" />

      </Datagrid>
    </List>)

    const polizas_pendientes = (<List {...this.props} style={{color:"red"}} title="Tienes Pólizas Pendientes de Pago"  >
      <Datagrid>
        <TextField source="price" label="Monto" />
        <DateField source="date" label="Fecha" />
        <TextField source="state" label="estado" />
        <PayButton />
      </Datagrid>
    </List>)

    const noAccount = this.state.noAccount ? (<Alert text="Alerta" subtitle="Tienes Propiedades sin una cuenta bancaria" link="/propietarios#/propiedades" link_text="Revisar Propiedades" style={styles.welcome} />
 ) : null;

    const paymentPending = this.state.paymentPending ? (<Alert text="Alerta" subtitle="Tienes Pólizas de Seguro Pendientes" link="/propietarios#/seguros" link_text="PAGAR AHORA" style={styles.welcome} />) : null


    return (
      <div>
        {/* {width === 1 && <AppBarMobile title="Posters Galore Admin" />} */}
        <div style={styles.welcome}>
          {datagrid}
        </div>
        <div style={styles.flex}>
          
          <div style={styles.leftCol}>
            <div style={styles.flex}>
             {paymentPending}

              {/* {polizas_pendientes} */}
              {/* <NbNewOrders value={nbNewOrders} /> */}
            </div>
            <div style={styles.flex}>
              {noAccount}
            </div>
           
          </div>
          <div style={styles.rightCol}>
            <div style={styles.flex}>
              <AmountCard value={this.state.monthTotal} />
              {/* <NewCustomers nb={nbNewCustomers} visitors={newCustomers} /> */}
            </div>
          </div>
        </div>
      </div>



    );
  }

}



export const PaymentList = (props) => (
  <List title="Últimos Pagos" {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="price" label="Monto" />
      <TextField source="state" label="Estado" />
      <DateField source="date" label="Fecha" />

    </Datagrid>
  </List>
);

export const PaymentShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
    </SimpleShowLayout>
  </Show>
);

const styles = {
  welcome: { marginBottom: '2em' },
  flex: { display: 'flex' },
  leftCol: { flex: 1, marginRight: '1em' },
  rightCol: { flex: 1, marginLeft: '1em' },
  singleCol: { marginTop: '2em' },
};