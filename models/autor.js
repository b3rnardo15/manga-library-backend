const mongoose = require('mongoose');

const autorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do autor é obrigatório'],
    trim: true
  },
  biografia: {
    type: String,
    trim: true
  },
  pais: {
    type: String,
    required: [true, 'O país de origem é obrigatório'],
    trim: true
  },
  dataNascimento: {
    type: Date
  },
  website: {
    type: String,
    trim: true
  },
  foto: {
    type: String,
    default: 'default-autor.jpg'
  },
  obrasNotaveis: [{
    type: String,
    trim: true
  }],
  dataAdicionado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Autor', autorSchema);