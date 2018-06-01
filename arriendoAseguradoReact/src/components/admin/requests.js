// in src/posts.js
import React from 'react';
import { List, Datagrid, TextField, DateField, ShowButton, TabbedForm, FormTab, BooleanField, Show, SimpleShowLayout, ReferenceField } from 'admin-on-rest';
import ApproveButton from './ApproveQuotation';


const colored = WrappedComponent => props => props.record[props.source] == "Aprobado" ?
  <span style={{ color: 'green' }}><WrappedComponent {...props} /></span>  :
  <span style={{ color: 'red' }}><WrappedComponent {...props} /></span> ;


const show = WrappedComponent => props => props.record["status"] == "Aprobado" ?
  null:
 <WrappedComponent {...props} />;


const ColoredTextField = colored(TextField);


const Aproval = show(ApproveButton);


export const RequestList = (props) => (
  <List  {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="Solicitante" source="user_id" reference="users" linkType={false}>
        <TextField source="name" />
      </ReferenceField>
      <ColoredTextField source="status" />
      <DateField source="created_at" label="Fecha" />
      <ShowButton label="Ver Solicitud" />
      <Aproval />

    </Datagrid>
  </List>
);

export const RequestShow = (props) => (
  <Show {...props}>
    <TabbedForm>
      <FormTab label="General">
        <TextField source="id" label="ID" />
        <TextField source="first_name" label="Primer nombre" />
        <TextField source="last_name" label="Apellido"  />
        <TextField source="email" label="Correo electrónico"  />
        <TextField source="phone" label="Teléfono" />        
      </FormTab>
      <FormTab label="Contrato">
        <TextField source="contract.amount" label="Valor del arriendo"/>
        <TextField source="contract.automatic_renewal"  label="Renovación automática"/>
        <TextField source="contract.created_at" label="Solicitud creada" />
        <TextField source="contract.id"  label="Contrato" />
        <TextField source="contract.init_date"  label="Inicio del contrato" />
        <TextField source="contract.months"  label="Meses del contrato"/>
        <TextField source="contract.pay_day" label="Día de pago" />
        <TextField source="contract.penalty" label="Monto de multa" />
        <TextField source="contract.penalty_type" label="Tipo de multa" />
        <TextField source="type_money"  label="Tipo de pago"/>
        <TextField source="contract.updated_at" label="Contrato actualizado"  />
      </FormTab>
      <FormTab label="Plan">
        <TextField source="plan.id" label="Plan id" />
        <TextField source="plan.description" label="Descripción" />
        <TextField source="plan.price" label="Precio del plan"/>
      </FormTab>
    </TabbedForm>
  </Show>
);