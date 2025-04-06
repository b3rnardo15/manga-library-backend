const Manga = require('../models/manga');

// Obter todos os mangás
exports.getMangas = async (req, res) => {
  try {
    const mangas = await Manga.find()
      .populate('autor', 'nome')
      .populate('editora', 'nome');
    
    res.status(200).json({
      success: true,
      count: mangas.length,
      data: mangas
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Obter um mangá específico por ID
exports.getManga = async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id)
      .populate('autor')
      .populate('editora');
    
    if (!manga) {
      return res.status(404).json({
        success: false,
        error: 'Mangá não encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: manga
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Criar um novo mangá
exports.createManga = async (req, res) => {
  try {
    const manga = await Manga.create(req.body);
    
    res.status(201).json({
      success: true,
      data: manga
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Atualizar um mangá
exports.updateManga = async (req, res) => {
  try {
    const manga = await Manga.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!manga) {
      return res.status(404).json({
        success: false,
        error: 'Mangá não encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: manga
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Deletar um mangá
exports.deleteManga = async (req, res) => {
  try {
    const manga = await Manga.findByIdAndDelete(req.params.id);
    
    if (!manga) {
      return res.status(404).json({
        success: false,
        error: 'Mangá não encontrado'
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