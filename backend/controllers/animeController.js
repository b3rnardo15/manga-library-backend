const Anime = require('../models/anime.js');

exports.createAnime = async (req, res) => {
    try {
        const { titulo, ano, genero, numeroEpisodios, sinopse, estudio } = req.body;
        const anime = new Anime({ titulo, ano, genero, numeroEpisodios, sinopse, estudio });
        await anime.save();
        res.status(201).json(anime);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAnimes = async (req, res) => {
    try {
        const animes = await Anime.find().populate('estudio'); // Já traz os dados do estúdio
        res.status(200).json(animes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAnimeById = async (req, res) => {
    try {
        const anime = await Anime.findById(req.params.id).populate('estudio');
        if (!anime) {
            return res.status(404).json({ message: 'Anime não encontrado' });
        }
        res.status(200).json(anime);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateAnime = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, ano, genero, numeroEpisodios, sinopse, estudio } = req.body;

        const updatedAnime = await Anime.findByIdAndUpdate(
            id,
            { titulo, ano, genero, numeroEpisodios, sinopse, estudio },
            { new: true }
        );

        if (!updatedAnime) {
            return res.status(404).json({ message: 'Anime não encontrado' });
        }

        res.status(200).json(updatedAnime);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteAnime = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAnime = await Anime.findByIdAndDelete(id);

        if (!deletedAnime) {
            return res.status(404).json({ message: 'Anime não encontrado' });
        }

        res.status(200).json({ message: 'Anime excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
