const mongoose = require('mongoose');

const estudioSchema = new mongoose.Schema(
    {
        nome: { 
            type: String, 
            required: true,
            trim: true
        },
        fundacao: { 
            type: Number,
            required: true
        },
        pais: { 
            type: String, 
            required: true 
        },
        descricao: { 
            type: String,
            required: true
        },
        website: { 
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Estudio = mongoose.model('Estudio', estudioSchema);

module.exports = Estudio;