import { Button } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css';

import { useState, useEffect } from 'react';

import { Table } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;

const TableComponent = ({ data, config, actions , content, loading,   onRowClick}) => {
  return (<Table
        loading = {loading}
        height={600}
        data={data} 
        onRowClick={ onRowClick }>
        
            {config.map((c) => (
              <Column flexGrow={!c.width ? 1 : 0} width={c.width} fixed={c.fixed}>
                <HeaderCell>{c.label}</HeaderCell>
                {!c.content ? <Cell dataKey={c.key} /> : 
                <Cell>
                  {(item) => c.content(item)}
                </Cell>
              }
              </Column>
            ))}

            
              <Column width={150} fixed="right">
                <HeaderCell>Ações</HeaderCell>
                <Cell>
                  {(item) => actions(item)}
                </Cell>
              </Column>
      </Table>
  );
};

export default TableComponent;
