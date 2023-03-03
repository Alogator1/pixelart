import React from 'react';
import { Header } from './components/header/header';
import { Table } from './components/table/table';
import { TableProvider } from './context/provider';

function App() {
  return (
    <TableProvider>
      <Header /> 
      <Table />
    </TableProvider>
  );
}

export default App;
