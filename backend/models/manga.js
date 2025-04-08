const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título do mangá é obrigatório'],
    trim: true
  },
  sinopse: {
    type: String,
    required: [true, 'A sinopse é obrigatória'],
    trim: true
  },
  genero: {
    type: String,
    required: [true, 'O gênero é obrigatório'],
    enum: ['Shonen', 'Shojo', 'Seinen', 'Josei', 'Kodomo', 'Ecchi', 'Hentai', 'Isekai', 'Outro']
  },
  volumes: {
    type: Number,
    default: 1
  },
  anoLancamento: {
    type: Number,
    required: [true, 'O ano de lançamento é obrigatório']
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Autor',
    required: [true, 'O autor é obrigatório']
  },
  editora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Editora',
    required: [true, 'A editora é obrigatória']
  },
  emAndamento: {
    type: Boolean,
    default: true
  },
  capa: {
    type: String,
    default: 'default-manga.jpg'
  },
  dataAdicionado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Manga', mangaSchema);