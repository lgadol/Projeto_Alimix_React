import React, { useState, useEffect } from 'react';
import "./styles.css";
import Main from '../template/main';
import { useNavigate } from 'react-router-dom';
import { fetchCategoria, fetchTipoMovimentacao, fetchTransacao, fetchUsuario, fetchSaldoMensal, fetchSaldoAtual } from '../controllers/Api';
import { format } from 'date-fns';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function Movimentacao() {
    const navigate = useNavigate();
    const [transacao, setTransacao] = useState([]);
    const [saldoMensal, setSaldoMensal] = useState([]);
    const [saldoAtual, setSaldoAtual] = useState([]);
    const [movimentacoes, setMovimentacoes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/todasmovimentacoes');
                console.log(response.data);
                setMovimentacoes(response.data.movimentacoes);
            } catch (error) {
                console.error('Erro ao buscar todas as movimentações', error);
            }
        }

        fetchData();
    }, []);

    function getStyle(saldo) {
        if (saldo >= 0) {
            return {
                color: 'green',
                backgroundColor: 'lightgreen'
            };
        } else {
            return {
                color: 'red',
                backgroundColor: 'lightcoral'
            };
        }
    }

    return (
        <Main>
            <div className='content container-fluid'>
                <div className="row header">
                    <div className="col">
                        <strong style={{ fontSize: '15px' }}>Movimentação</strong>
                        <hr />
                        <div className='alimix_movimentacao'>
                            <div className='col'>
                                <p>Descrição</p>
                            </div>
                            <div className='col'>
                                <p>Tipo</p>
                            </div>
                            <div className='col'>
                                <p>Data</p>
                            </div>
                            <div className='col'>
                                <p>Valor</p>
                            </div>
                            <div className='col'>
                                <p>CPF</p>
                            </div>
                        </div>
                        {movimentacoes.map((item, index) => {
                            const dataDoBanco = item.datahora ? item.datahora.date : null;
                            const data = dataDoBanco ? new Date(dataDoBanco) : null;
                            const dataFormatada = data ? format(data, 'dd/MM/yy HH:mm') : 'Data não disponível';
                            const categoriaNome = item.categoria ? item.categoria.nome : 'Categoria não disponível';
                            const tipoMovimentacaoNome = item.categoria && item.categoria.tipoMovimentacao ? item.categoria.tipoMovimentacao.nome : 'Tipo de Movimentação não disponível';

                            return (
                                <div className='alimix_transacao' key={index}>
                                    <p>{categoriaNome}</p>
                                    <p>{tipoMovimentacaoNome}</p>
                                    <p>{dataFormatada}</p>
                                    <p>{item.valor ? item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Valor não disponível'}</p>
                                    <p>98765432100</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col">
                        {/* <strong style={{ fontSize: '15px' }}>Saldo</strong>
                        <hr />
                        <div className='alimix_saldo'>
                            <p>Saldo Mensal</p>
                        </div>
                        {saldoMensal.map((item, index) => (
                            <div className='saldo_mensal' key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p><strong>Entrada: </strong>{item.entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <p><strong>Saída: </strong>{item.saida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <p><strong>Saldo Atual: </strong><span style={getStyle(item.saldo_mensal)}>{item.saldo_mensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
                                <p><strong>Data: </strong>{item.mes_ano}</p>
                            </div>
                        ))}
                        <div className='alimix_saldo'>
                            <p>Saldo Atual</p>
                        </div>
                        {saldoAtual.map((item, index) => (
                            <div className='saldo_atual' key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p><strong>Entrada: </strong>{item.entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <p><strong>Saída: </strong>{item.saida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <p style={{
                                    borderColor: item.saldo_atual >= 0 ? 'green' : 'red',
                                    backgroundColor: item.saldo_atual >= 0 ? 'lightgreen' : 'lightcoral',
                                }}><strong>Saldo Atual: </strong>{item.saldo_atual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default Movimentacao;