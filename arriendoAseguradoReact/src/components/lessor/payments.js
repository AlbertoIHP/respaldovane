// in src/posts.js
import React from 'react';
import { List, Datagrid, TextField, DateField, BooleanField, ShowButton, Show, SimpleShowLayout, ReferenceField } from 'admin-on-rest';
import PayButton from './RentPayOrder'

export const PaymentList = (props) => (
  <List title="Últimos Pagos" {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="price" label="Monto" />
      <TextField source="state" label="Estado" />
      <DateField source="date" label="Fecha" />
      <PayButton />
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