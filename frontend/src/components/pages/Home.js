import React, { useState, useEffect } from 'react';
import "./styles.css";
import Main from '../template/main';
import { useNavigate } from 'react-router-dom';
import { fetchCategoria, fetchTipoMovimentacao, fetchTransacao, fetchUsuario, fetchSaldoMensal, fetchSaldoAtual } from '../controllers/Api';

function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        categoria: [],
        tipoMovimentacao: [],
        transacao: [],
        usuario: [],
        saldoMensal: [],
        saldoAtual: []
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const categoriaData = await fetchCategoria();
                const tipoMovimentacaoData = await fetchTipoMovimentacao();
                const transacaoData = await fetchTransacao();
                const usuarioData = await fetchUsuario();
                const saldoMensalData = await fetchSaldoMensal();
                const saldoAtualData = await fetchSaldoAtual();

                setData({
                    categoria: categoriaData,
                    tipoMovimentacao: tipoMovimentacaoData,
                    transacao: transacaoData,
                    usuario: usuarioData,
                    saldoMensal: saldoMensalData,
                    saldoAtual: saldoAtualData
                });
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
                        <span>Movimentação</span>
                        {data.transacao.map((item, index) => (
                            <div key={index}>
                                {/* Exiba as informações que deseja aqui */}
                                <p>{item.valor}</p>
                            </div>
                        ))}
                    </div>
                    <div className="col">
                        <span>Saldo</span>
                        {/* Mapeie os dados que deseja exibir aqui */}
                        {data.saldoAtual.map((item, index) => (
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