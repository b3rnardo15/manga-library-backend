const Editora = require('../models/editora');
const Manga = require('../models/manga');

// Obter todas as editoras
exports.getEditoras = async (req, res) => {
  try {
    const editoras = await Editora.find();
    
    res.status(200).json({
      success: true,
      count: editoras.length,
      data: editoras
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Obter uma editora específica por ID
exports.getEditora = async (req, res) => {
  try {
    const editora = await Editora.findById(req.params.id);
    
    if (!editora) {
      return res.status(404).json({
        success: false,
        error: 'Editora não encontrada'
      });
    }
    
    // Buscar todos os mangás desta editora
    const mangas = await Manga.find({ editora: req.params.id })
      .select('titulo genero anoLancamento')
      .populate('autor', 'nome');
    
    res.status(200).json({
      success: true,
      data: editora,
      mangas
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Criar uma nova editora
exports.createEditora = async (req, res) => {
  try {
    const editora = await Editora.create(req.body);
    
    res.status(201).json({
      success: true,
      data: editora
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Atualizar uma editora
exports.updateEditora = async (req, res) => {
  try {
    const editora = await Editora.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!editora) {
      return res.status(404).json({
        success: false,
        error: 'Editora não encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      data: editora
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Deletar uma editora
exports.deleteEditora = async (req, res) => {
  try {
    // Verificar se existem mangás associados a esta editora
    const mangasCount = await Manga.countDocuments({ editora: req.params.id });
    
    if (mangasCount > 0) {
      return res.status(400).json({
        success: false,
        error: `Esta editora não pode ser excluída, pois está associada a ${mangasCount} mangá(s)`
      });
    }
    
    const editora = await Editora.findByIdAndDelete(req.params.id);
    
    if (!editora) {
      return res.status(404).json({
        success: false,
        error: 'Editora não encontrada'
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