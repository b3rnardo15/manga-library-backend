const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('Tentando conectar com:', process.env.MONGO_URI); 
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Erro ao conectar ao MongoDB: ${err.message}`);
    console.error('String de conexão usada:', process.env.MONGO_URI); 
    process.exit(1);
  }
};

module.exports = connectDB;
