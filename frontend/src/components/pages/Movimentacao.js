import React, { useState, useEffect } from 'react';
import "./styles.css";
import Main from '../template/main';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

function Movimentacao() {
    const navigate = useNavigate();
    const [saldosMensais, setSaldosMensais] = useState([]);
    const [movimentacoes, setMovimentacoes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/todasmovimentacoes');
                const movimentacoesData = response.data.movimentacoes;

                // Ordena as movimentações por data
                movimentacoesData.sort((a, b) => new Date(a.datahora.date) - new Date(b.datahora.date));

                setMovimentacoes(movimentacoesData);

                // Calcula os saldos mensais
                const grupos = agruparPorMes(movimentacoesData);
                const novosSaldosMensais = [];

                Object.keys(grupos).forEach(mesAno => {
                    let entrada = 0;
                    let saida = 0;

                    grupos[mesAno].forEach(mov => {
                        const valor = mov.valor;
                        const tipoMovimentacaoNome = mov.categoria && mov.categoria.tipoMovimentacao ? mov.categoria.tipoMovimentacao.nome : '';

                        if (tipoMovimentacaoNome === 'Entrada') {
                            entrada += valor;
                        } else if (tipoMovimentacaoNome === 'Saída') {
                            saida += valor;
                        }
                    });

                    const saldo = entrada - saida;

                    novosSaldosMensais.push({ mesAno, entrada, saida, saldo });
                });

                setSaldosMensais(novosSaldosMensais);
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

    let totalEntrada = 0;
    let totalSaida = 0;

    movimentacoes.forEach(item => {
        const valor = item.valor;
        const tipoMovimentacaoNome = item.categoria && item.categoria.tipoMovimentacao ? item.categoria.tipoMovimentacao.nome : '';

        if (tipoMovimentacaoNome === 'Entrada') {
            totalEntrada += valor;
        } else if (tipoMovimentacaoNome === 'Saída') {
            totalSaida += valor;
        }
    });

    let saldoAtual = totalEntrada - totalSaida;

    function agruparPorMes(movimentacoes) {
        const grupos = {};

        movimentacoes.forEach(mov => {
            const data = new Date(mov.datahora.date);
            const mesAno = `${data.getMonth() + 1}-${data.getFullYear()}`;

            if (!grupos[mesAno]) {
                grupos[mesAno] = [];
            }

            grupos[mesAno].push(mov);
        });

        return grupos;
    }

    const grupos = agruparPorMes(movimentacoes);

    Object.keys(grupos).forEach(mesAno => {
        let entrada = 0;
        let saida = 0;

        grupos[mesAno].forEach(mov => {
            const valor = mov.valor;
            const tipoMovimentacaoNome = mov.categoria && mov.categoria.tipoMovimentacao ? mov.categoria.tipoMovimentacao.nome : '';

            if (tipoMovimentacaoNome === 'Entrada') {
                entrada += valor;
            } else if (tipoMovimentacaoNome === 'Saída') {
                saida += valor;
            }
        });

        const saldo = entrada - saida;
    });


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
                        <strong style={{ fontSize: '15px' }}>Saldo</strong>
                        <hr />
                        <div className='alimix_saldo'>
                            <p>Saldo Mensal</p>
                        </div>
                        {saldosMensais.map((saldoMensal, index) => (
                            <div className='saldo_mensal' key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p><strong>Entrada: </strong>{saldoMensal.entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <p><strong>Saída: </strong>{saldoMensal.saida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <p><strong>Saldo Atual: </strong><span style={getStyle(saldoMensal.saldo)}>{saldoMensal.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
                                <p><strong>Data: </strong>{saldoMensal.mesAno}</p>
                            </div>
                        ))}
                        <div className='alimix_saldo'>
                            <p>Saldo Atual</p>
                        </div>
                        <div className='saldo_atual' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p><strong>Entrada: </strong>{totalEntrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <p><strong>Saída: </strong>{totalSaida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <p style={{
                                borderColor: saldoAtual >= 0 ? 'green' : 'red',
                                backgroundColor: saldoAtual >= 0 ? 'lightgreen' : 'lightcoral',
                            }}><strong>Saldo Atual: </strong>{saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default Movimentacao;