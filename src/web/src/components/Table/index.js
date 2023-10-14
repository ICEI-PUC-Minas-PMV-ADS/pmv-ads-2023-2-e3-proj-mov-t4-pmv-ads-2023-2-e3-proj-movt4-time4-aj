import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useState, useEffect } from 'react';

import { Table } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;

const TableComponent = ({ data, config, actions , onRowClick}) => {
  return (<Table
        height={600}
        data={data} 
        onRowClick={ onRowClick }>
        
            {config.map((c) => (
              <Column flexGrow={!c.width ? 1 : 0} width={c.width} fixed={c.fixed}>
                <HeaderCell>{c.label}</HeaderCell>
                <Cell dataKey={c.key} />
              </Column>
            ))}

            
              <Column width={150} fixed="right">
                <HeaderCell>Ações</HeaderCell>
                <Cell>
                  {(item) => actions(item)}
                </Cell>
              </Column>


            {/* <Column width={80} fixed="right">
              <HeaderCell>...</HeaderCell>

              <Cell style={{ padding: '6px' }}>
                {rowData => (
                  <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                    Edit
                  </Button>
                )}
              </Cell>
            </Column> */}

      </Table>
  );
};

export default TableComponent;
