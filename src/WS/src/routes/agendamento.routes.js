const express = require('express');
const router = express.Router();
const axios = require('axios');
const Horario = require('../models/horario');
const Agendamento = require('../models/agendamento');
const Cliente = require('../models/cliente');
const Salao = require('../models/salao');
const Servico = require('../models/servico');
const Colaborador = require('../models/colaborador');

const moment = require('moment');
const mongoose = require('mongoose');
const _ = require('lodash');

const keys = require('../data/keys.json');
const util = require('../services/util');
const agendamento = require('../models/agendamento');

router.post('/filter', async (req, res) => {
  try {
    const { periodo, salaoId } = req.body;

    const agendamentos = await Agendamento.find({
      salaoId,
      data: {
        $gte: moment(periodo.inicio).startOf('day'),
        $lte: moment(periodo.final).endOf('day'),
      },
    }).populate([
      { path: 'servicoId', select: 'titulo duracao' },
      { path: 'colaboradorId', select: 'nome' },
      { path: 'clienteId', select: 'nome' },
    ]);

    res.json({ error: false, agendamentos });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post('/', async (req, res) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const { clienteId, salaoId, servicoId, colaboradorId } = req.body;

    // Recupera o cliente
    const cliente = await Cliente.findById(clienteId).select(
      'nome documento customerId telefone tipo email endereco'
    );
    const salao = await Salao.findById(salaoId).select('recipientId');
    const servico = await Servico.findById(servicoId).select(
      'preco titulo comissao'
    );
    const colaborador = await Colaborador.findById(colaboradorId).select(
      'recipientId'
    );

    // formatar numero de telefone
    function extrairCodigoDeAreaENumero(numeroTelefone) {
      const codigoDeArea = numeroTelefone.slice(0, 2);
      const numero = numeroTelefone.slice(2);
    
      return { codigoDeArea, numero };
    }
    
    const numeroTelefone = cliente.telefone;
    const { codigoDeArea, numero } = extrairCodigoDeAreaENumero(numeroTelefone);
    
    // console.log(numero);
    // console.log(codigoDeArea);
    //Concatenar o numero com o codigo do país

    const telefoneConcatenado = `+55${cliente.telefone}`;

    // PREÇO TOTAL DA TRANSAÇÃO
    const precoFinal = util.toCents(servico.preco) * 100;

    // REGRAS DE SPLIT DO COLABORADOR   
    const colaboradorSplitRule = {
      options: {charge_remainder_fee: true},
      recipient_id: colaborador.recipientId,
      amount: parseInt(precoFinal * (servico.comissao / 100)),
      type: 'flat'
    };

    console.log('quantia do colaborador', colaboradorSplitRule.amount);
    console.log('quantia do salao', precoFinal - keys.app_fee - colaboradorSplitRule.amount);
    console.log('quantia do App', keys.app_fee );

    const fatiaColaborador = colaboradorSplitRule.amount;
    const fatiaSalao = precoFinal - keys.app_fee - colaboradorSplitRule.amount;
    const fatiaApp =  keys.app_fee;

    console.log(fatiaColaborador);
    console.log(fatiaSalao);
    console.log(fatiaApp);
    //campos obrigatórios

    const options = {
      method: 'POST',
      url: 'https://api.pagar.me/core/v5/orders',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: ''//autenticação aqui,
      },
      data: {
        customer: {
          phones: {mobile_phone: {country_code: '55', area_code: codigoDeArea, number: numero}},
          name: cliente.nome,
          email: cliente.email,
          document: cliente.documento.numero,
          type: cliente.tipo
        },
        shipping: {
          address: {
            line_1: cliente.endereco.logradouro,
            zip_code: cliente.endereco.cep,
            city: cliente.endereco.cidade,
            state: cliente.endereco.uf,
            country: 'BR'
          },
          description: 'agendamento de serviço',
          recipient_phone: telefoneConcatenado
        },
        SubMerchant: {
          phones: {home_phone: {country_code: '55', area_code: codigoDeArea, number: numero}}
        },
        items: [
          {
            amount: precoFinal,
            description: servico.titulo,
            quantity: 1,
            code: servicoId
          }
        ],
        location: {latitude: '-22.970722', longitude: '43.182365'},
        antifraud: {type: 'clearsale', clearsale: {custom_sla: '90'}},
        device: {platform: 'ANDROID OS'},
        payments: [
          {
            payment_method: 'credit_card',
            credit_card: {
              recurrence: false,
              statement_descriptor: cliente.endereco.uf,
              card: {
                number: '4000000000000010',
                holder_name: 'Tony Stark',
                exp_month: 1,
                exp_year: 30,
                cvv: '3531',
                billing_address: {
                  line_1: cliente.endereco.logradouro,
                  zip_code: cliente.endereco.cep,
                  city: cliente.endereco.cidade,
                  state: cliente.endereco.uf,
                  country: 'BR'
                }
              }
            },
            //regras 
            split: [
              {//salao
                options: {charge_processing_fee: true, liable: true},
                recipient_id: 're_clnfhcb3x0ld1019tjhajfbtw',
                type: 'flat',
                amount: fatiaSalao,
              },
              {//colaborador
                options: {charge_remainder_fee: true},
                recipient_id: colaborador.recipientId,
                amount: fatiaColaborador,
                type: 'flat'
              },
              {//aplicativo
                options: {charge_processing_fee: false},
                amount: keys.app_fee,
                recipient_id: 're_clngaf44y0qe0019t7xovopou',
                type: 'flat'
              }
            ]
          }
        ],
        customer_id: cliente.customerId,
        antifraud_enabled: false
      }
    };

    const response = await axios.post(options.url, options.data, { headers: options.headers });

    // A resposta da requisição está no campo data do objeto response
    console.log('Resposta da requisição:', JSON.stringify(response.data, null, 2));

    if (options.error) {
      throw { message: options.message };
    }

    const transactionId = options.data.id;
    console.log('Conteúdo completo de options.data:', JSON.stringify(options, null, 2));


    const agendamento = await new Agendamento({
      ... req.body,
      transactionId: transactionId,
      comissao: servico.comissao,
      valor: servico.preco
    }).save({session});
    
    // await new Agendamento(agendamento).save();

    await session.commitTransaction();
    session.endSession();

    res.json({ error: false, agendamento: { transactionId } });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ error: true, message: err.message });
  }
});

router.post('/dias-disponiveis', async (req, res) => {
  try {
    const { data, salaoId, servicoId } = req.body;
    const horarios = await Horario.find({ salaoId });
    const servico = await Servico.findById(servicoId).select('duracao');
    let colaboradores = [];

    let agenda = [];
    let lastDay = moment(data);

    // DURAÇÃO DO SERVIÇO
    const servicoMinutos = util.hourToMinutes(
      moment(servico.duracao).format('HH:mm')
    );

    const servicoSlots = util.sliceMinutes(
      moment(servico.duracao),
      moment(servico.duracao).add(servicoMinutos, 'minutes'),
      util.SLOT_DURATION,
    ).length;

    //  procura nos próximos 365 dias até a agenda conter 7 dias disponíveis
    for (let i = 0; i <= 365 && agenda.length <= 7; i++) {
      const espacosValidos = horarios.filter((horario) => {
        // VERIFICAR DIA DA SEMANA
        const diaSemanDisponivel = horario.dias.includes(moment(lastDay).day());

        // VERIFICAR ESPECIALIDADE DISPONÍVEL
        const servicoDisponivel = horario.especialidades.includes(servicoId);

        return diaSemanDisponivel && servicoDisponivel;
      });



      


      if (espacosValidos.length > 0) {
        // TODOS OS HORÁRIOS DISPONÍVEIS DAQUELE DIA
        let todosHorariosDia = {};

        for (let espaco of espacosValidos) {
          for (let colaboradorId of espaco.colaboradores) {
            if (!todosHorariosDia[colaboradorId]) {
              todosHorariosDia[colaboradorId] = [];
            }
            
            // pega todos os horarios do espaço e joga pra dentro do colaborador
            
            todosHorariosDia[colaboradorId] = [
              ...todosHorariosDia[colaboradorId],
              ...util.sliceMinutes(
                util.mergeDateTime(lastDay, espaco.inicio),
                util.mergeDateTime(lastDay, espaco.fim),
                util.SLOT_DURATION
              ),
            ];
          }
        } 

        for (let colaboradorId of Object.keys(todosHorariosDia)) {
          // LER AGENDAMENTOS DAQUELE ESPECIALISTA NAQUELE DIA

          // console.log(colaboradorId); //debug
          // console.log(lastDay.format('DD/MM/YYYY')); //debug

          const agendamentos = await Agendamento.find({
            // colaboradorId: colaboradorKey,
            colaboradorId,
            data: {
              $gte: moment(lastDay).startOf('day'),
              $lte: moment(lastDay).endOf('day'),
            },
          })
          .select('data servicoId -_id')
          .populate('servicoId', 'duracao');

          // RECUPERANDO HORÁRIOS OCUPADOS
          let horariosOcupados = agendamentos.map((agendamento) => ({
              inicio: moment(agendamento.data),
              final: moment(agendamento.data).add(
                util.hourToMinutes(
                  moment(agendamento.servicoId.duracao).format('HH:mm')
              ), 
              'minutes'
              ),
          }));

          horariosOcupados = horariosOcupados
          .map((horario) => 
            util.sliceMinutes(
              horario.inicio, 
              horario.final, 
              util.SLOT_DURATION
              )
            )
            .flat();

            

            // Removendo todos os slots/horarios ocupados

            let horariosLivres = util.splitByValue(
              todosHorariosDia[colaboradorId].map((horarioLivre) => {
                return horariosOcupados.includes(horarioLivre) 
                ? '-' 
                : horarioLivre;
              }),
              '-'
            ).filter(space => space.length > 0);

            horariosLivres = horariosLivres.map((slot) =>
            slot.filter((horario, index) => slot.length - index > servicoSlots
            )).flat();

            // separando de dois em dois para o react
            horariosLivres = _.chunk(horariosLivres, 2);

            // REMOVENDO O COLABORADOR DO DIA, CASO NÃO TENHA ESPAÇOS NA AGENDA
            if (horariosLivres.length === 0) {
                todosHorariosDia = _.omit(todosHorariosDia, colaboradorId);
              } else {
                todosHorariosDia[colaboradorId] = horariosLivres;
              }
          } 

          // VERIFICANDO SE TEM ESPECIALISTA COMA AGENDA NAQUELE DIA
          const totalEspecialistas = Object.keys(todosHorariosDia).length;

          if (totalEspecialistas > 0) {
            colaboradores.push(Object.keys(todosHorariosDia));
            console.log(todosHorariosDia);
            agenda.push({
              [moment(lastDay).format('YYYY-MM-DD')]: todosHorariosDia,
            });
          }
        


        agenda.push({
          [lastDay.format('YYYY-MM-DD')] : todosHorariosDia,
        });
        }

      lastDay = lastDay.add(1, 'day');
    };

//         // VERIFICANDO SE TEM ESPECIALISTA COMA AGENDA NAQUELE DIA
//         const totalColaboradores = Object.keys(todosHorariosDia).length;

//         if (totalColaboradores > 0) {
//           colaboradores.push(Object.keys(todosHorariosDia));
//           console.log(todosHorariosDia);
//           agenda.push({
//             [moment(lastDay).format('YYYY-MM-DD')]: todosHorariosDia,
//           });
//         }
//       }

    colaboradores = _.uniq(colaboradores.flat())

    colaboradores = await Colaborador.find({
      _id: { $in: _.uniq(colaboradores.flat()) },
    }).select('nome foto');

    colaboradores = colaboradores.map((c) => ({
      ...c._doc,
      nome: c.nome.split(' ')[0],
    }));

    res.json({ error: false, 
      colaboradores,
      agenda
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
