const express = require('express');
const router = express.Router();
const {
  getAutores,
  getAutor,
  createAutor,
  updateAutor,
  deleteAutor
} = require('../controllers/autorController');

router
  .route('/')
  .get(getAutores)
  .post(createAutor);

router
  .route('/:id')
  .get(getAutor)
  .put(updateAutor)
  .delete(deleteAutor);

module.exports = router;