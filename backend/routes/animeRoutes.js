const express = require('express');
const router = express.Router();
const { 
    createAnime, 
    getAnimes, 
    getAnimeById, 
    updateAnime, 
    deleteAnime 
} = require('../controllers/animeController');

// Rotas de animes
router.post('/', createAnime);
router.get('/', getAnimes);
router.get('/:id', getAnimeById);
router.put('/:id', updateAnime);
router.delete('/:id', deleteAnime);

module.exports = router;
