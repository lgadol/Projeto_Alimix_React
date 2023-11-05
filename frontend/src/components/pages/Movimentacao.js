import React, { useState, useEffect } from 'react';
import "./styles.css";
import Main from '../template/main';
import { useNavigate } from 'react-router-dom';
import { fetchCategoria, fetchTipoMovimentacao, fetchTransacao, fetchUsuario, fetchSaldoMensal, fetchSaldoAtual } from '../controllers/Api';
import { format } from 'date-fns';

function Movimentacao() {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState([]);
    const [tipoMovimentacao, setTipoMovimentacao] = useState([]);
    const [transacao, setTransacao] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [saldoMensal, setSaldoMensal] = useState([]);
    const [saldoAtual, setSaldoAtual] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const categoriaData = await fetchCategoria();
                setCategoria(categoriaData);
            } catch (error) {
                console.error('Erro ao buscar os dados da categoria:', error);
            }

            try {
                const tipoMovimentacaoData = await fetchTipoMovimentacao();
                setTipoMovimentacao(tipoMovimentacaoData);
            } catch (error) {
                console.error('Erro ao buscar os dados do tipo de movimentação:', error);
            }

            try {
                const transacaoData = await fetchTransacao();
                setTransacao(transacaoData);
            } catch (error) {
                console.error('Erro ao buscar os dados da transação:', error);
            }

            try {
                const usuarioData = await fetchUsuario();
                setUsuario(usuarioData);
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }

            try {
                const saldoMensalData = await fetchSaldoMensal();
                setSaldoMensal(saldoMensalData);
            } catch (error) {
                console.error('Erro ao buscar os dados do saldo mensal:', error);
            }

            try {
                const saldoAtualData = await fetchSaldoAtual();
                setSaldoAtual(saldoAtualData);
            } catch (error) {
                console.error('Erro ao buscar os dados do saldo atual:', error);
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
                        {transacao.map((item, index) => {
                            const dataDoBanco = item.datahorario;
                            const data = new Date(dataDoBanco);
                            const dataFormatada = format(data, 'dd/MM/yy HH:mm');
                            const categorias = {
                                0: "Pagamento Recebido :)",
                                1: "Alimentação",
                                2: "Abastecimento",
                                3: "Lazer",
                                4: "Saúde"
                            };

                            return (
                                <div className='alimix_transacao' key={index}>
                                    <p>{item.categoria === 0 ? 'Entrada' : 'Saída'}</p>
                                    <p>{categorias[item.categoria]}</p>
                                    <p>{dataFormatada}</p>
                                    <p>{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
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
                        ))}
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default Movimentacao;