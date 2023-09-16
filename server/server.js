import express from 'express';
import cors from 'cors';
import { createConnection } from 'mysql';

const app = express();

app.use(cors());

const projetoucsCONN = createConnection({
    host: 'localhost',
    user: 'root',
    password: '09azgope',
    database: 'projetoucs'
});

app.get('/categoria', (req, res) => {
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
    projetoucsCONN.query('SELECT * FROM transacao', (err, rows) => {
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
});


/* Servidor rodando */
app.listen(4000, () => {
    console.log('API listening on port 4000');
});