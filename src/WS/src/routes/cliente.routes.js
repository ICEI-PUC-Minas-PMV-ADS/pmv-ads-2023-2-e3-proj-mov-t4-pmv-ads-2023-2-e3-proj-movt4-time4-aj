const express = require('express');
const axios = require('axios');
const router = express.Router();
const mongoose = require('mongoose');
const Cliente = require('../models/cliente');
const SalaoCliente = require('../models/relationship/salaoCliente');
const moment = require('moment');
// const pagarme = require('../services/pagarme');

router.post('/validarLogin', async (req, res) => {
  const { email, senha} = req.body;

  console.log("Validating:", email, senha); // Log para verificar os dados recebidos

    try {
        const user = await Cliente.findOne({ email, senha });

        if (user) {
          console.log("Usuário encontrado:", user);
          res.send({ isValid: true, userId: user._id });
      } else {
        console.log("Userário não encontrado com os dados:", email, senha);
        res.send({ isValid: false });
      }

    } catch (err) {
        console.error("Erro com o banco de dados:", err); // Log para possíveis erros
        res.status(500).send('Erro de query.');
    }
});

// valida se o email ou cpf já existe
router.get('/check', async (req, res) => {
  const { email, cpf } = req.query;
  try {
    const emailExists = await Cliente.findOne({ email });
    const cpfExists = await Cliente.findOne({ "documento.numero": cpf });
    
    if (emailExists && cpfExists) {
      return res.json({ emailExists: true, cpfExists: true });
    } else if (emailExists) {
      return res.json({ emailExists: true, cpfExists: false });
    } else if (cpfExists) {
      return res.json({ emailExists: false, cpfExists: true });
    } else {
      return res.json({ emailExists: false, cpfExists: false });
    }
  } catch (error) {
    console.error('Erro ao verificar:', error);
    res.status(500).send('Erro interno do servidor.');
  }
});

// cria o cliente
router.post('/', async (req, res) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const { cliente, salaoId } = req.body;
    let newCliente = null;

    const existentClient = await Cliente.findOne({
      $or: [
        { email: cliente.email },
        { telefone: cliente.telefone },
        //{ cpf: cliente.cpf },
      ],
    });

    function extrairCodigoDeAreaENumero(numeroTelefone) {
      const codigoDeArea = numeroTelefone.slice(0, 2);
      const numero = numeroTelefone.slice(2);
    
      return { codigoDeArea, numero };
    }
    
    const numeroTelefone = cliente.telefone;
    const { codigoDeArea, numero } = extrairCodigoDeAreaENumero(numeroTelefone);

    if (!existentClient) {
      const _id = new mongoose.Types.ObjectId();
      // const cliente = req.body.cliente;
      console.log(cliente);

      const options = {
        method: 'POST',
        url: 'https://api.pagar.me/core/v5/customers',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: ''//autenticação aqui,
        },
        data: {
          phones: {mobile_phone: {country_code: '55', area_code: codigoDeArea, number: numero}},
          name: cliente.nome,
          email: cliente.email,
          code: _id,
          document: cliente.documento.numero,
          document_type: cliente.documento.tipo,
          type: cliente.tipo,
          country: 'br',
        }
      };

      if (options.error) {
        throw options.data;
      }

      console.log(options);

      const pagarmeCliente = await axios.request(options);
      console.log(pagarmeCliente.data);

      if (pagarmeCliente.error) {
        throw pagarmeCliente.data;
      }

      newCliente = await new Cliente({
        ...cliente,
        _id,
        customerId: pagarmeCliente.data.id,
      }).save({ session });
      console.log('Dados do novo cliente: ',newCliente);
    }

    const clienteId = existentClient 
    ? existentClient._id 
    : newCliente._id;

    const existentRelationship = await SalaoCliente.findOne({
      salaoId,
      clienteId,
    });

    if (!existentRelationship) {
      await new SalaoCliente({
        salaoId,
        clienteId,
      }).save({ session });
    }

    if (existentClient) {
      await SalaoCliente.findOneAndUpdate(
        {
          salaoId,
          clienteId,
        },
        { status: 'A' },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    if (
      existentRelationship &&
      existentRelationship.status === 'A' &&
      existentClient
    ) {
      res.json({ error: true, message: 'Cliente já cadastrado!' });
    } else {
      res.json({ error: false });
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ error: true, message: err.message });
  }
});

// retorna os clientes com base no filtro
router.post('/filter', async (req, res) => {
  try {
    const clientes = await Cliente.find(req.body.filters);
    res.json({ error: false, clientes });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// retorna todos os clientes de um salão com base no id do salão
router.get('/salao/:salaoId', async (req, res) => {
  try {
    const { salaoId } = req.params;
    const clientes = await SalaoCliente.find({
      salaoId,
      status: { $ne: 'E' }
    })
      .populate('clienteId')
      .select('clienteId dataCadastro');

    const mappedClientes = clientes.map((vinculo) => {
      if (vinculo.clienteId) {
        return {
          ...vinculo.clienteId._doc,
          vinculoId: vinculo._id,
          dataCadastro: moment(vinculo.dataCadastro).format('DD/MM/YYYY'),
        };
      }
      return null;
    }).filter(Boolean);

    res.json({
      error: false,
      clientes: mappedClientes,
    });
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    res.status(500).json({ error: true, message: 'Erro ao buscar clientes.' });
  }
});

//  Deleta o vinculo de um cliente com o salão
router.delete('/vinculo/:id', async (req, res) => {
  try {
    await SalaoCliente.findByIdAndUpdate(req.params.id, { status: 'I' });
    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
