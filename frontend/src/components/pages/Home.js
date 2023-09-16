import React, { useState, useEffect } from 'react';
import "./styles.css";
import Main from '../template/main';
import { useNavigate } from 'react-router-dom';
import { fetchCategoria, fetchTipoMovimentacao, fetchTransacao, fetchUsuario, fetchSaldoMensal, fetchSaldoAtual } from '../controllers/Api';

function Home() {
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

                const tipoMovimentacaoData = await fetchTipoMovimentacao();
                setTipoMovimentacao(tipoMovimentacaoData);

                const transacaoData = await fetchTransacao();
                setTransacao(transacaoData);

                const usuarioData = await fetchUsuario();
                setUsuario(usuarioData);

                const saldoMensalData = await fetchSaldoMensal();
                setSaldoMensal(saldoMensalData);

                const saldoAtualData = await fetchSaldoAtual();
                setSaldoAtual(saldoAtualData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <Main>
            <div className='content container-fluid'>
                <div className="row header">
                    <div className="col">
                        <strong>Movimentação</strong>
                        <hr />
                        <div className='alimix_movimentacao'>
                            <p>Nome</p>|
                            <p>Descrição</p>|
                            <p>Data</p>|
                            <p>Valor</p>|
                            <p>CPF</p>
                        </div>
                        {transacao.map((item, index) => (
                            <div key={index}>
                                <p>{item.categoria}</p>
                                <p>{item.categoria}</p>
                                <p>{item.categoria}</p>
                                <p>{item.categoria}</p>
                            </div>
                        ))}
                    </div>
                    <div className="col">
                        <strong>Saldo</strong>
                        <hr />
                        <div className='alimix_saldo'>
                            <p>Saldo Mensal</p>|
                            <p>Saldo Atual</p>
                        </div>
                        {saldoAtual.map((item, index) => (
                            <div key={index}>
                                {/* Exiba as informações que deseja aqui */}
                                <p>{item.entrada}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default Home;