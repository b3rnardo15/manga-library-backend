const Autor = require('../models/autor');
const Manga = require('../models/manga');

// Obter todos os autores
exports.getAutores = async (req, res) => {
  try {
    const autores = await Autor.find();
    
    res.status(200).json({
      success: true,
      count: autores.length,
      data: autores
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Obter um autor específico por ID
exports.getAutor = async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);
    
    if (!autor) {
      return res.status(404).json({
        success: false,
        error: 'Autor não encontrado'
      });
    }
    
    // Buscar todos os mangás deste autor
    const mangas = await Manga.find({ autor: req.params.id })
      .select('titulo genero anoLancamento');
    
    res.status(200).json({
      success: true,
      data: autor,
      mangas
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Criar um novo autor
exports.createAutor = async (req, res) => {
  try {
    const autor = await Autor.create(req.body);
    
    res.status(201).json({
      success: true,
      data: autor
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Atualizar um autor
exports.updateAutor = async (req, res) => {
  try {
    const autor = await Autor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!autor) {
      return res.status(404).json({
        success: false,
        error: 'Autor não encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: autor
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Deletar um autor
exports.deleteAutor = async (req, res) => {
  try {
    // Verificar se existem mangás associados a este autor
    const mangasCount = await Manga.countDocuments({ autor: req.params.id });
    
    if (mangasCount > 0) {
      return res.status(400).json({
        success: false,
        error: `Este autor não pode ser excluído, pois está associado a ${mangasCount} mangá(s)`
      });
    }
    
    const autor = await Autor.findByIdAndDelete(req.params.id);
    
    if (!autor) {
      return res.status(404).json({
        success: false,
        error: 'Autor não encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};