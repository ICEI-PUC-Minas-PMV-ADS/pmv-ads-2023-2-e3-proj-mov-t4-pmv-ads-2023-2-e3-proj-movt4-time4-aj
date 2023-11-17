import { useEffect, useState } from 'react';
import bancos from '../../data/bancos.json';

import { 
  Message,
  Drawer,
  Nav,
  Badge,
  Checkbox,
  DateRangePicker,
  TagPicker,
  SelectPicker,
  Button,
  Notification,
  Tag,
  Modal,
  Icon,
 } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css';
import 'rsuite/dist/styles/rsuite-default.css';

import util from '../../services/util';

import Table from '../../components/Table';

import { useDispatch, useSelector } from 'react-redux';
import { 
  allColaboradores, 
  updateColaborador,
  filterColaborador,
  addColaborador,
  unlinkColaborador,
  resetColaborador,
  allServicos,
  saveColaborador
} from '../../store/modules/colaborador/actions';


const Colaboradores= () => {
  const dispatch = useDispatch();
  const { colaborador, colaboradores, form, servicos, components, behavior} = useSelector((state) => state.colaborador)


  const setComponent = (component, state) =>{
      dispatch(updateColaborador({
          components: {...components, [component]: state},
      })
    );
  }

  const onRowClick = (colaborador) => {
    dispatch(
      updateColaborador({
        colaborador,
        behavior: 'update',
      })
    );
    setComponents('drawer', true);
  };

  const setColaborador = (key, value) => {
    dispatch(updateColaborador({
      colaborador: {...colaborador, [key]: value},
      })
    );
  };

  const save = () => {
    if (
      !util.allFields(colaborador, [
        'email',
        'nome',
        'telefone',
        'dataNascimento',
        'status',
        'especialidades',
      ]) ||
      !util.allFields(colaborador.contaBancaria, [
        'banco',
        'agencia',
        'numero',
        'dv',
      ])
    ) {
      // DISPARAR O ALERTA
      Notification.error({
        placement: 'topStart',
        title: 'Calma lá!',
        description: 'Antes de prosseguir, preencha todos os campos!',
      });
      return false;
    }

    if (behavior === 'create') {
      dispatch(addColaborador());
    } else {
      dispatch(saveColaborador());
    }
  };


  const remove = () => {
    dispatch(unlinkColaborador());
  };

  const setComponents = (component, state) => {
    dispatch(
      updateColaborador({
        components: { ...components, [component]: state },
      })
    );
  };

  const setContaBancaria = (key, value) => {
    dispatch(
      updateColaborador({
        colaborador: {
          ...colaborador,
          contaBancaria: { ...colaborador.contaBancaria, [key]: value },
        },
      })
    );
  };


  useEffect(() => {
    dispatch(allColaboradores());
    dispatch(allServicos());
  }, [])

  return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer show={components.drawer} size="sm" onHide={() => setComponent('drawer', false)}>
        <Drawer.Body>
          <h3>{behavior == "create" ? "Criar novo" : "Atualizar"} Colaborador </h3>
          <div className='row mt-3'>
          <div className='form-group col-12 mb-3'>
              <b>E-mail</b>
              <div className='input-group'>
                <input 
                  type="email" 
                  className='form-control' 
                  placeholder='E-mail do cleinte'
                  disabled={behavior == "update"} 
                  value={colaborador.email}
                  onChange={(e) =>  setColaborador('email', e.target.value) }
                />
                {behavior == 'create' && (
                  <div className='input-group-append'>
                    <Button appearance='primary' 
                    loading={form.filtering} 
                    disabled={form.filtering}
                    onClick={() => dispatch(filterColaborador())}
                    >
                      Pesquisar
                      </Button>
                  </div>
                )}
              </div>
            
            </div>
            <div className="form-group col-6">
                <b className="">Nome</b>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome do colaborador"
                  disabled={form.disabled}
                  value={colaborador.nome}
                  onChange={(e) => setColaborador('nome', e.target.value)}
                />
            </div>
            <div className="form-group col-6">
              <b className="">Telefone / Whatsapp</b>
              <input
                type="text"
                className="form-control"
                placeholder="Telefone / Whatsapp do colaborador"
                disabled={form.disabled}
                value={colaborador.telefone}
                onChange={(e) => setColaborador('telefone', e.target.value)}
              />
            </div>
            <div className="form-group col-6 mt-3">
              <b className="">Data de Nascimento</b>
              <input
                type="date"
                className="form-control"
                disabled={form.disabled}
                value={colaborador.dataNascimento}
                onChange={(e) => setColaborador('dataNascimento', e.target.value)}
              />
            </div>
            <div className="form-group col-6 mt-3">
              <b className="">Número do CPF</b>
              <input
                type="text"
                className="form-control"
                disabled={form.disabled}
                value={colaborador.documento.numero}
                onChange={(e) =>
                  setColaborador('documento', {
                    ...colaborador.documento,
                    numero: e.target.value,
                  })
                }
              />
            </div>

            {/* especialidades */}

            <div className="col-12">
              <b>Especialidades</b>
              <TagPicker
                size="lg"
                block
                data={servicos}
                disabled={form.disabled && behavior === 'create'}
                value={colaborador.especialidades}
                onChange={(especialidade) => setColaborador('especialidades', especialidade)}
              />
              <Checkbox
                checked={colaborador.especialidades?.length === servicos.length}
                disabled={
                  (form.disabled && behavior === 'create') ||
                  colaborador.especialidades?.length === servicos.length
                }
                onChange={(v, checked) => {
                  if (checked) {
                    setColaborador(
                      'especialidades',
                      servicos.map((s) => s.value)
                    );
                  } else {
                    setColaborador('especialidades', []);
                  }
                }}
              >
                {' '}
                Selecionar Todas
              </Checkbox>
            </div>

            {/* dados bancários */}

            <Message
            showIcon
            className="my-4"
            type="info"
            description="Preencha corretamente as informações bancárias do colaborador."
            />

          <div className="row">
            <div className="form-group col-6">
              <b className="">Banco</b>
              <SelectPicker
                disabled={form.disabled}
                value={colaborador.contaBancaria.banco}
                onChange={(value) => setContaBancaria('banco', value)}
                data={bancos}
                block
                size="lg"
              />
            </div>
            <div className="form-group col-6">
              <b className="">Tipo de Conta</b>
              <select
                className="form-control"
                disabled={form.disabled}
                value={colaborador.contaBancaria.tipo}
                onChange={(e) => setContaBancaria('tipo', e.target.value)}
              >
                <option value="conta_corrente">Conta Corrente</option>
                <option value="conta_poupanca">Conta Poupança</option>
              </select>
            </div>
            <div className="form-group col-6">
              <b className="">Agência</b>
              <input
                type="text"
                className="form-control"
                placeholder="Agência"
                disabled={form.disabled}
                value={colaborador.contaBancaria.agencia}
                onChange={(e) => setContaBancaria('agencia', e.target.value)}
              />
            </div>
            <div className="form-group col-4">
              <b className="">Número da Conta</b>
              <input
                type="text"
                className="form-control"
                placeholder="Número da Conta"
                disabled={form.disabled}
                value={colaborador.contaBancaria.numero}
                onChange={(e) => setContaBancaria('numero', e.target.value)}
              />
            </div>
            <div className="form-group col-2">
              <b className="">Dígito</b>
              <input
                type="text"
                className="form-control"
                placeholder="DV"
                disabled={form.disabled}
                value={colaborador.contaBancaria.dv}
                onChange={(e) => setContaBancaria('dv', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group col-6">
              <b className="">Status</b>
              <select
                className="form-control"
                disabled={form.disabled && behavior === 'create'}
                value={colaborador.vinculo}
                onChange={(e) => setColaborador('vinculo', e.target.value)}
              >
                <option value="A">Ativo</option>
                <option value="I">Inativo</option>
              </select>
            </div>
          <Button
            loading={form.saving}
            color={behavior === 'create' ? 'green' : 'primary'}
            size="lg"
            block
            onClick={() => save()}
            className="mt-3"
          >
            {behavior === 'create' ? "salvar" : "Atualizar" } Colaborador

          </Button>
          {behavior === 'update' && (
            <Button
              loading={form.saving}
              color="red"
              size="lg"
              block
              onClick={() => setComponents('confirmDelete', true)}
              className="mt-1"
            >
              Remover Colaborador
            </Button>
            )}
            {/* <div className="form-group col-6">
              <b>Tipo de documento</b>
              <select
                disabled={form.disabled}
                className="form-control"
                value={cliente.documento.tipo}
                onChange={(e) =>
                  setColaborador('documento', {
                    ...cliente.documento,
                    tipo: e.target.value,
                  })
                }
              >
                <option value="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
              </select>
            </div> */}


            {/* <div className="form-group col-6 mt-3">
              <b className="">CEP</b>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o CEP"
                disabled={form.disabled}
                value={colaborador.endereco.cep}
                onChange={(e) =>
                  setColaborador('endereco', {
                    ...colaborador.endereco,
                    cep: e.target.value,
                  })
                }
              />
            </div> */}
            {/* <div className="form-group col-12 mt-3">
              <b className="">Rua / Logradouro</b>
              <input
                type="text"
                className="form-control"
                placeholder="Rua / Logradouro"
                disabled={form.disabled}
                value={cliente.endereco.logradouro}
                onChange={(e) =>
                  setColaborador('endereco', {
                    ...cliente.endereco,
                    logradouro: e.target.value,
                  })
                }
              />
            </div> */}
            {/* <div className="form-group col-6 mt-3">
              <b className="">UF</b>
              <input
                type="text"
                className="form-control"
                placeholder="UF"
                disabled={form.disabled}
                value={cliente.endereco.uf}
                onChange={(e) =>
                  setColaborador('endereco', {
                    ...cliente.endereco,
                    uf: e.target.value,
                  })
                }
              />
            </div> */}
            {/* <div className="form-group col-6 mt-3">
              <b className="">Cidade</b>
              <input
                type="text"
                className="form-control"
                placeholder="Cidade"
                disabled={form.disabled}
                value={colaborador.endereco.cidade}
                onChange={(e) =>
                  setColaborador('endereco', {
                    ...colaborador.endereco,
                    cidade: e.target.value,
                  })
                }
              />
            </div> */}
          </div>
        </Drawer.Body>
      </Drawer>      
      
      <Modal
        show={components.confirmDelete}
        onHide={() => setComponent('confirmDelete', false)}
        size="xs"
      >
        <Modal.Body>
          <Icon
            icon="remind"
            style={{
              color: '#ffb300',
              fontSize: 24,
            }}
          />
          {'  '} Tem certeza que deseja excluir? Essa ação será irreversível!
        </Modal.Body>
        <Modal.Footer>
          <Button loading={form.saving} onClick={() => remove()} color="red">
            Sim, tenho certeza!
          </Button>
          <Button
            onClick={() => setComponent('confirmDelete', false)}
            appearance="subtle"
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>     

      <div className="row">
        <div className="col-12">
          <div className="w-100 d-flex justify-content-between">
            <h2 className="mb-4 mt-0">Colaboradores</h2>
            <div>
              <button
                className='btn btn-primary btn-lg'
                onClick={() => {
                  dispatch(
                    updateColaborador({
                      behavior: 'create',
                    })
                  );
                  setComponent('drawer', true)
                }}
               >
                <span className='mdi mdi-plus'>Novo Colaborador</span>
              </button>
            </div>
          </div>
          <Table 
            loading={form.filtering}
            data={colaboradores}
            config={[
                {label: "Nome", key: 'nome', width: 150, fixed: true },
                { label: 'E-mail', key: 'email' },
                { label: 'Telefone', key: 'telefone', width: 200 },
                { label: 'Data Cadastro', key: 'dataCadastro', width: 200 },
              ]}
            actions={(colaborador) => (
              <Button color="green" appearance="primary" size='xs'>
                Ver informações
                </Button>
            )}
            onRowClick={(colaborador) => {
              dispatch(
                updateColaborador({
                  behavior: 'update',
                })
              );
              dispatch(
                updateColaborador({
                  colaborador,
                })
              );
              setComponent('drawer', true);
            }}
            />
        </div>
      </div>
    </div>

  );
};

export default Colaboradores;