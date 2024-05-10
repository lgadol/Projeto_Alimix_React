import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());

app.get('/todasmovimentacoes', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/api/todasmovimentacoes');
        res.send(response.data);
    } catch (error) {
        console.error('Erro ao buscar todas as movimentações', error);
        res.status(500).send('Erro ao buscar dados da API PHP');
    }
});

app.get('/movimentacoes', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/api/movimentacoes');
        res.send(response.data);
    } catch (error) {
        console.error('Erro ao buscar movimentações', error);
        res.status(500).send('Erro ao buscar dados da API PHP');
    }
});

/* Servidor rodando */
app.listen(5000, () => {
    console.log('API listening on port 5000');
});