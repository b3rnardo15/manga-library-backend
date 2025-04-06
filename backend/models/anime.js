const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    numeroEpisodios: {
        type: Number,
        required: true
    },
    sinopse: {
        type: String,
        required: true
    },
    estudio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudio',
        required: true
    }
}, {
    timestamps: true // cria createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Anime', animeSchema);
