const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colaborador = new Schema ({
    nome: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    email: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    tipo: {
        type : String,
        enum : ["individual", "company"],
        default : null,
    },
    foto: {
        type: String,
        default: null,
    },
    senha: {
        type: String,
        default: 1234,
    },
    documento: {
        tipo: {
          type: String,
          enum: ['cpf'],
          required : [true, "Esse campo é obrigatório! "]
        },
        numero: {
          type: String,
          required : [true, "Esse campo é obrigatório! "]
        },
      },
    dataNascimento: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    telefone: {
        type: String,
        required: true,
        unique: true,
      },
    status: {
        type : String,
        required : [true, "Esse campo é obrigatório! "],
        enum : ["A", "I", "E"],
        default : ['A']
    },
    contaBancaria : {
        banco : {
            type : String,
            required : true
        },
        agencia : {
            type : String,
            required : true
        },
        numero : {
            type : String,
            required : true
        },
        dv : {
            type : String,
            required : true
        },
        tipoConta: {
            type : String,
            enum : ["checking", "savings"],
            required : true
        },
    },
    recipientId : {
        type : String,
        required : true
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },
})

module.exports = mongoose.model('Colaborador', colaborador)