require('dotenv').config();
// Importando dependencias
const cors = require('cors');

const express = require('express');
const app = express();
const tasksRoutes = require('./routes/tasksRoutes');


// Middleware para parsear (tranformar) JSON
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/tasks', tasksRoutes);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
