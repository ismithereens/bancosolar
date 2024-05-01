import express from 'express';
process.loadEnvFile();
import router from './routes/routes.js'
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use('/', router);
app.listen(PORT, ()=> console.log(`Server hosteado en el puerto: ${PORT}`));