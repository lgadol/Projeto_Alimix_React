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

/* app.get('/categoria', (req, res) => {
    projetoucsCONN.query('SELECT * FROM categoria', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/tipomovimentacao', (req, res) => {
    projetoucsCONN.query('SELECT * FROM tipomovimentacao', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/transacao', (req, res) => {
    projetoucsCONN.query('SELECT * FROM transacao order by datahorario desc', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/usuario', (req, res) => {
    projetoucsCONN.query('SELECT * FROM usuario', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/saldomensal', (req, res) => {
    projetoucsCONN.query('SELECT * FROM saldomensal', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/saldoatual', (req, res) => {
    projetoucsCONN.query('SELECT * FROM saltoatual', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
}); */


/* Servidor rodando */
app.listen(5000, () => {
    console.log('API listening on port 5000');
});