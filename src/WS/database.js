const mongoose = require('mongoose');
require('dotenv').config();

// Variáveis de ambiente para acesso ao BD
const URI = process.env.MONGODB_URI;

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

mongoose
  .connect(URI)
  .then(() => console.log('Banco de dados conectado!'))
  .catch(() => console.log(err));