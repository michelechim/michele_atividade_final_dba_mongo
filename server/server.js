import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import produtoRoute from './routes/produto.js'
// import methodOverride from 'method-override'

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', (req, res) => {
  res.send({ express: 'Servidor Express Rodando!' });
});

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/produtos',produtoRoute)

app.listen(port,() => {
    console.log(`Servidor rodando na porta ${port}`);
});