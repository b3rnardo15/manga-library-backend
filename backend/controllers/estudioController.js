const Estudio = require('../models/estudio.js');

exports.createEstudio = async (req, res) => {
    try {
        const { nome, fundacao, pais, descricao, website } = req.body;
        const estudio = new Estudio({ nome, fundacao, pais, descricao, website });
        await estudio.save();
        res.status(201).json(estudio);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getEstudios = async (req, res) => {
    try {
        const estudios = await Estudio.find();
        res.status(200).json(estudios);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getEstudioById = async (req, res) => {
    try {
        const estudio = await Estudio.findById(req.params.id);
        if (!estudio) {
            return res.status(404).json({ message: 'Estúdio não encontrado' });
        }
        res.status(200).json(estudio);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateEstudio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, fundacao, pais, descricao, website } = req.body;

        const updatedEstudio = await Estudio.findByIdAndUpdate(
            id, 
            { nome, fundacao, pais, descricao, website }, 
            { new: true }
        );
        
        if (!updatedEstudio) {
            return res.status(404).json({ message: 'Estúdio não encontrado' });
        }
        
        res.status(200).json(updatedEstudio);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteEstudio = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEstudio = await Estudio.findByIdAndDelete(id);
        
        if (!deletedEstudio) {
            return res.status(404).json({ message: 'Estúdio não encontrado' });
        }
        
        res.status(200).json({ message: 'Estúdio excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};