// in src/posts.js
import React, { Component } from 'react';
import { List, Datagrid, TextField, DateField, ShowButton, Show, SimpleShowLayout, ReferenceField } from 'admin-on-rest';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import PayButton from './PayOrder'


import { BASE_URL } from '../Environment';


export class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { locations: [] }
  }


  componentDidMount() {
    // this.state.
  }



  render() {
    const { myOwnProp, ...otherProps } = this.props;


    const datagrid = (<List {...this.props} title="Pólizas de Seguros Pendientes" >
      <Datagrid>
        <TextField source="id" />
        <TextField source="price" label="Monto a Cancelar" />
        <DateField source="date" label="Fecha" />
        <TextField source="state" label="estado" />
        <PayButton />
      </Datagrid>
    </List>)

    return (
      <div>
        <Card>
          <CardHeader>Hola</CardHeader>
        </Card>
        <Card>
          {datagrid}
        </Card>
        <Card>
          <CardHeader>Monto Mensual</CardHeader>
          <CardText>{this.state.monto_mensual}</CardText>
        </Card>
      </div>
    );
  }

}







export const InsuranceList = (props) => (
  <Card>

    <Card>
    </Card>


    <List title="Pólizas" {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="price" label="Monto a Cancelar" />
        <DateField source="date" label="Fecha" />
        <TextField source="state" label="estado" />
        <PayButton />
      </Datagrid>
    </List>
  </Card>



);

export const InsuranceShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);