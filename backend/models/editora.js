const mongoose = require('mongoose');

const editoraSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome da editora é obrigatório'],
    trim: true,
    unique: true
  },
  pais: {
    type: String,
    required: [true, 'O país de origem é obrigatório'],
    trim: true
  },
  anoFundacao: {
    type: Number
  },
  descricao: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  logo: {
    type: String,
    default: 'default-editora.jpg'
  },
  dataAdicionado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Editora', editoraSchema);