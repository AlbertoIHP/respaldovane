// in src/posts.js
import React from 'react';
import { Responsive, SimpleList, BooleanField, TextInput, SelectField, SimpleForm, SelectInput, Edit, FormTab, FunctionField, NumberField, TabbedForm, PersonIcon, EditButton, ReferenceManyField, List, Datagrid, TextField, DateField, ShowButton, Show, SimpleShowLayout, ReferenceField } from 'admin-on-rest';
import { Card, CardText, CardTitle, CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import UserIcon from 'material-ui/svg-icons/action/home';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';


const cardStyle = {
  width: 300,
  minHeight: 100,
  margin: '0.5em',
  display: 'inline-block',
  verticalAlign: 'top'
};
const styles = {
  label: {
    fontSize: '22px'
  }
};

const show = WrappedComponent => props => (props.accounts && props.accounts.length) ? null : <WrappedComponent hola={console.log(props)} {...props} />;

const BankAccount = show(Link)

const CommentGrid = ({ ids, record, data, basePath }) => (
  <div style={{ margin: '1em' }}>
    {ids.map(id =>
      <Card key={id} style={cardStyle}>
        <CardMedia>
          <img style={{ width: "100%", height: "100%" }} src="https://ecowellness.com/wp-content/uploads/2017/04/property.jpg" />
        </CardMedia>
        <CardText>
          <TextField record={data[id]} source="body" />
          <span style={{ fontWeight: "bold" }} >Dirección:</span> <br /> {data[id].address}
        </CardText>
        <CardText>

        </CardText>
        <CardActions >


          <Link to={`/propiedades/${data[id].id}/show`}><FlatButton label="detalle" /></Link>;


          <BankAccount accounts={data[id].bank_accounts} style={{ color: "red" }} to={`/propiedades/${data[id].id}`}><FlatButton label="Cuenta Bancaria" /> </BankAccount>;

        </CardActions>

      </Card>
    )}
  </div>
);
CommentGrid.defaultProps = {
  data: {},
  ids: [],
};

export const PropertyList = (props) => (
  <List title="Propiedades" {...props}>
    <CommentGrid />
  </List>
);





export const PropertyShow = (props) => (

  <Show title="Detalle Propiedad" {...props}>
    <TabbedForm>
      <FormTab label="Información">
        <h3>Datos Propiedad</h3>
        <hr />
        <img src="https://ecowellness.com/wp-content/uploads/2017/04/property.jpg" style={{ width: "300px" }} />
        <br />
        <TextField source="address" label="Dirección Propiedad" />
        <TextField source="type" label="Tipo de Propiedad" />
        <NumberField source="quotation[0].monthly_price" label="Valor Arriendo" options={{ style: 'currency', currency: 'CLP' }} style={{ display: 'inline-block', width: '25%' }} />

        <TextField source="quotation[0].contract.pay_day" label="Día de pago" style={{ display: 'inline-block', width: '25%' }} />

        <h3>Datos Arrendatario</h3>
        <hr />
        <FunctionField label="Nombre" render={record => record.quotation ? `${record.quotation[0].lessor.name}  ${record.quotation[0].lessor.last_name}` : null} />
        <TextField source="quotation[0].lessor.email" label="Email" />
        <TextField source="quotation[0].lessor.phone" label="Teléfono" />

      </FormTab>
      <FormTab label="Pagos">

        <h3>Datos Para Depósito</h3>
        <hr />
        <TextField source="bank_accounts[0].owner" label="Nombre Titular" />
        <TextField source="bank_accounts[0].dni" label="Rut" />


        <TextField source="bank_accounts[0].account_number" label="Número de cuenta" />
        <SelectField source="bank_accounts[0].bank" label="Banco" choices={[
          { id: '1', name: 'BANCO DE CHILE - EDWARDS' },
          { id: '2', name: 'BANCO BICE' },
          { id: '3', name: 'BANCO CONSORCIO' },
          { id: '4', name: 'BANCO DEL ESTADO DE CHILE' },
          { id: '5', name: 'BANCO DO BRASIL S.A.' },
          { id: '6', name: 'BANCO FALABELLA' },
          { id: '7', name: 'BANCO INTERNACIONAL' },
          { id: '8', name: 'BANCO PARIS' },
          { id: '9', name: 'BANCO RIPLEY' },
          { id: '10', name: 'BANCO SANTANDER' },
          { id: '11', name: 'BANCO SECURITY' },
          { id: '12', name: 'BBVA' },
          { id: '13', name: 'BCI' },
          { id: '14', name: 'COOPEUCH' },
          { id: '15', name: 'ITAU-CHILE' },
          { id: '16', name: 'ITAU-CORPBANCA' },
          { id: '17', name: 'SCOTIABANK' },
        ]} />

        <SelectField source="bank_accounts[0].account_type" label="Tipo de Cuenta" choices={[
          { id: '1', name: 'Cuenta Corriente' },
          { id: '2', name: 'Cuenta Vista' },
          { id: '3', name: 'Ahorro' }
        ]} />
        <br />
        <h3>Pagos</h3>
        <hr />
        <ReferenceManyField perPage={10} reference="pagos" label="Historial de Pagos" target="property_id">
          <Datagrid>
            <TextField source="id" />
            <TextField source="price" label="Monto" />
            <TextField source="state" label="Estado" />
            <DateField source="date" label="Fecha" />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>

      <FormTab label="Contrato">
        <TextField source="quotation[0].contract.id" label="Número contrato" />
        <TextField source="quotation[0].contract.amount" label="Monto Arriendo" />
        <FunctionField label="Cobertura" render={record => record.quotation ? `${record.quotation[0].contract.months} meses` : null} />

        <FunctionField label="Penalización" render={record => record.quotation ? `${record.quotation[0].contract.penalty}  ${record.quotation[0].contract.penalty_type == "porcentaje" ? "% del arriendo" : "UF"}` : null} />
        <FunctionField label="Renovación Automática" render={record => record.quotation ? `${record.quotation[0].contract.automatic_renewal ? "Si" : "No"}` : null} />
      </FormTab>

    </TabbedForm>
  </Show>
);

export const PropertyEdit = (props) => (
  <Edit title="Detalle Propiedad" {...props}>
    <SimpleForm>
      <TextField source="id" />
      <TextField source="address" label="Dirección" />

      <br /><br />
      <h4 style={{ fontWeight: 600 }}>Datos Bancarios</h4>

      <TextInput source="owner" label="Nombre Titular" />

      <SelectInput source="bank" label="Seleccione Banco" choices={[
        { id: '1', name: 'BANCO DE CHILE - EDWARDS' },
        { id: '2', name: 'BANCO BICE' },
        { id: '3', name: 'BANCO CONSORCIO' },
        { id: '4', name: 'BANCO DEL ESTADO DE CHILE' },
        { id: '5', name: 'BANCO DO BRASIL S.A.' },
        { id: '6', name: 'BANCO FALABELLA' },
        { id: '7', name: 'BANCO INTERNACIONAL' },
        { id: '8', name: 'BANCO PARIS' },
        { id: '9', name: 'BANCO RIPLEY' },
        { id: '10', name: 'BANCO SANTANDER' },
        { id: '11', name: 'BANCO SECURITY' },
        { id: '12', name: 'BBVA' },
        { id: '13', name: 'BCI' },
        { id: '14', name: 'COOPEUCH' },
        { id: '15', name: 'ITAU-CHILE' },
        { id: '16', name: 'ITAU-CORPBANCA' },
        { id: '17', name: 'SCOTIABANK' },
      ]} />

      <TextInput source="dni" label="Rut" />
      <TextInput source="account_number" label="Número Cuenta" />

      <SelectInput source="account_type" label="Tipo de Cuenta" choices={[
        { id: '1', name: 'Cuenta Corriente' },
        { id: '2', name: 'Cuenta Vista' },
        { id: '3', name: 'Ahorro' }
      ]} />

    </SimpleForm>
  </Edit>
);