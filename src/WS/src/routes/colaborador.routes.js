const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Colaborador = require('../models/colaborador');
const SalaoColaborador = require('../models/relationship/salaoColaborador')
const ColaboradorServico = require('../models/relationship/colaboradorServico');
const moment = require('moment');
const pagarme = require('../services/pagarme');

router.post('/', async (req, res) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const { colaborador, salaoId } = req.body;
    let newColaborador = null;

    // verifica se o colaborador existe  
   const existentColaborador = await Colaborador.findOne({
      $or: [
        { email: colaborador.email },
        { telefone: colaborador.telefone },
        //{ cpf: colaborador.cpf },
      ],
    });

    // caso não exista, ele é cadastrado
    if (!existentColaborador) {
      const options = {
        method: 'POST',
        url: 'https://api.pagar.me/core/v5/recipients',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Basic c2tfdGVzdF80NjRlZWQzZTM3Zjc0NDlmYmQ2NzI0MmI1ZGM0NzZhMTo='
        },
        data: {
          name: colaborador.nome,
          email: colaborador.email,
          document: colaborador.documento,
          type: colaborador.tipo,

          default_bank_account: {
            holder_name: colaborador.nome,
            holder_type: colaborador.tipo,
            holder_document: colaborador.documento,
            bank: colaborador.default_bank_account.banco,
            branch_number: colaborador.default_bank_account.agencia,
            account_number: colaborador.default_bank_account.numero,
            account_check_digit: colaborador.default_bank_account.dv,
            type: colaborador.default_bank_account.tipoConta,
          },
        }
      };

      if (options.error) {
        throw options.data;
      }

      console.log(options);
  
      const pargarmeReceiver = await axios.request(options);
      console.log(pargarmeReceiver.data);

      if (pargarmeReceiver.error) {
        throw pargarmeReceiver.data;
      }
      
      // criando colaborador
      newColaborador = await new Colaborador({
        ...colaborador,
        recipientId: pargarmeReceiver.data.id,
      }).save({ session });
      console.log('Dados do novo colaborador: ',newColaborador);
    }

    const colaboradorId = existentColaborador
        ? existentColaborador._id
        : newColaborador._id;

      // RELAÇÃO COM O SALÃO
    const existentRelationship = await SalaoColaborador.findOne({
        salaoId,
        colaboradorId,
        status: { $ne: 'E'}
      });

    if (!existentRelationship) {
        await new SalaoColaborador({
          salaoId,
          colaboradorId,
          status: colaborador.vinculo,
        }).save({ session });
    }

    // se ja existir vinculo
    if (existentRelationship && existentRelationship.status === 'I') {
      await SalaoColaborador.findOneAndUpdate(
        {
          salaoId,
          colaboradorId,
        },
        { status: "A" },
        { session }
      );
    }

    // RELAÇÃO COM OS SERVIÇOS / ESPECIALIDADES
    await ColaboradorServico.insertMany(
      colaborador.especialidades.map((servicoId) => ({
        servicoId,
        colaboradorId,
      }),
      { session }
      )
    );

    await session.commitTransaction();
    session.endSession();

    if (existentRelationship && existentColaborador) {
      res.json({ error: true, message: 'Colaborador já cadastrado!' });
    } else {
      res.json({ error: false, message: 'Colaborador cadastrado com sucesso!' });
    }

    
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ error: true, message: err.message });//aqui está dando erro
  }
});


router.post('/filter', async (req, res) => {
    try {
        const colaboradores = await Colaborador.find(req.body.filters);
        res.json({error: false, colaboradores});
    } catch (err) {
        res.json({error: true, message: err.message});
    }
});


router.get('/salao/:salaoId', async (req, res) => {
    try {
        const { salaoId } = req.params;
        let listaColaboradores = [];

        const salaoColaboradores = await SalaoColaborador.find({
            salaoId,
            status: {$ne: 'E'},
        })
        // .populate('colaboradorId').select('colaboradorId dataCadastro status');
        .populate({path: 'colaboradorId', select: '-senha -recipientId'})
        for (let vinculo of salaoColaboradores) {
            const especialidades = await ColaboradorServico.find({
              colaboradorId: vinculo.colaboradorId._id
            });
  
            listaColaboradores.push({
                ... vinculo._doc,
                especialidades,
            });
        }

            res.json({
              error: false, 
              colaboradores: listaColaboradores.map((vinculo)=> ({
                ...vinculo.colaboradorId._doc,
                vinculoId: vinculo._id,
                vinculo: vinculo.status,
                especialidades: vinculo.especialidades,
                dataCadastro: moment(vinculo.dataCadastro).format('DD/MM/YYYY')

              }))
            });
    } catch (err) {
        res.json({error: true, message: err.message});
    }
});

// router.get('/salao/:salaoId', async (req, res) => {
//   try {
//       const {salaoId} = req.params;
//       let listaColaboradores = [];

//       const colaboradores = await SalaoColaborador.find({
//           salaoId,
//           status: {
//               $ne: 'E'
//           }
//       }).populate('colaboradorId').select('colaboradorId dataCadastro status');

//       for (let colaborador of colaboradores) {
//           const especialidades = await ColaboradorServico.find({colaboradorId: colaborador.colaboradorId._id});

//           listaColaboradores.push({
//               ... colaborador._doc,
//               especialidades: especialidades.map((e) => e.servicoId)
//           });
//       }

//       res.json({
//           error: false,
//           colaboradores: listaColaboradores.map((c) => ({
//               ...c.colaboradorId._doc,
//               vinculoId: c._id,
//               vinculo: c.status,
//               especialidades: c.especialidades,
//               dataCadastro: moment(c.dataCadastro).format('DD/MM/YYYY')
//           }))
//       });
//   } catch (err) {
//       res.json({error: true, message: err.message});
//   }
// });


router.put('/:colaboradorId', async (req, res) => {
    try {
        const {vinculo, vinculoId, especialidades} = req.body;
        const {colaboradorId} = req.params;

        await Colaborador.findByIdAndUpdate(colaboradorId, req.body);

        // ATUALIZANDO VINCULO
        if (vinculo) {
            await SalaoColaborador.findByIdAndUpdate(vinculoId, {status: vinculo});
        }

        // ATUALIZANDO ESPECIALIDADES
        if (especialidades) {
            await ColaboradorServico.deleteMany({colaboradorId});

            await ColaboradorServico.insertMany(especialidades.map(
              (servicoId) => ({
                servicoId, colaboradorId
              }))
              );
        }

        res.status(200).json({error: false});
    } catch (err) {
        res.json({error: true, message: err.message});
    }
});


router.delete('/vinculo/:id', async (req, res) => {
  const id = req.params.id; // Obtemos o ID da requisição

  try {
      // Atualiza o documento no banco de dados
      await SalaoColaborador.findByIdAndUpdate(id, { status: 'E' });

      // Responde ao cliente indicando que a operação foi bem-sucedida
      res.status(200).json({ success: true, message: 'Vínculo deletado com sucesso.' });
  } catch (err) {
      // Se ocorrer um erro, responda ao cliente com uma mensagem de erro
      res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;