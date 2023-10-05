const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Colaborador = require('../models/colaborador');

const pagarme = require('../services/pagarme');

router.post('/', async (req, res) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const { colaborador, salaoId } = req.body;
    // let newColaborador = null;

    const existentColaborador = await Colaborador.findOne({
      $or: [
        { email: colaborador.email },
        { telefone: colaborador.telefone },
      ],
    });

    if (!existentColaborador) {
      // CRIANDO A CONTA BANCÁRIA
      const { contaBancaria } = colaborador;
      const pagarmeBankAccount = await pagarme('/recipients', {
        url: 'https://api.pagar.me/core/v5/recipients',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Basic c2tfdGVzdF95WlJ3UnpxdDlqSGwwd3piOkJyZWFraW5nMWEyYi4='
        },
        default_bank_account: {
          holder_name: contaBancaria.titular,
          bank: contaBancaria.banco,
          branch_number: contaBancaria.agencia,
          account_check_digit: contaBancaria.dv,
          holder_type: contaBancaria.tipo,
          holder_document: contaBancaria.cpfCnpj,
          type: contaBancaria.tipo
        },
        name: colaborador.nome,
        document: contaBancaria.cpfCnpj,
        type: contaBancaria.tipo,
        email: colaborador.email
      });
      
      if (pagarmeBankAccount.error) {
        throw pagarmeBankAccount;
      }


      if (pagarmeBankAccount.error) {
        throw pagarmeRecipient;
      }

    
    }

    await session.commitTransaction();
    session.endSession();

    
  } 
  catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ error: true, message: err.message });
  }
});



module.exports = router;
