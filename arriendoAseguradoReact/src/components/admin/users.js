// in src/posts.js
import React from 'react';
import { List, Datagrid, TextField, DateField, ShowButton, Show, SimpleShowLayout, ReferenceField } from 'admin-on-rest';


export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="Solicitante" source="user_id" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="created_at" label="Fecha" />
      <ShowButton label="Ver Solicitud" />
    </Datagrid>
  </List>
);

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      
    </SimpleShowLayout>
  </Show>
);