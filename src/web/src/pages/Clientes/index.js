import { useEffect, useState } from 'react';

import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Table from '../../components/Table';

import { useDispatch, useSelector } from 'react-redux';
import { allClientes } from '../../store/modules/cliente/actions';


const Clientes = () => {

  const dispatch = useDispatch();
  const { clientes } = useSelector((state) => state.clientes)

  useEffect(() => {
    dispatch(allClientes())
  }, [])

  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="row">
        <div className="col-12">
          <div className="w-100 d-flex justify-content-between">
            <h2 className="mb-4 mt-0">Clientes</h2>
            <div>
              <button className='btn btn-primary btn-lg'>
                <span className='mdi mdi-plus'>Novo Cliente</span>
              </button>
            </div>
          </div>
          <Table 
            data={clientes}
            config={[
              { label: 'Nome', key: 'nome', width: 150, fixed: true },
              { label: 'E-mail', key: 'email' },
              { label: 'Telefone', key: 'telefone', width: 200 },
              { label: 'Data Cadastro', key: 'dataCadastro', width: 200 },
            ]}
            actions={(cliente) => (
              <Button color="green" appearance="primary" size='xs'>
                Ver informações
                </Button>
            )}
            onRowClick={(clientes) => {alert(clientes.firstName);}}
            />
        </div>
      </div>
    </div>

  );
};

export default Clientes;