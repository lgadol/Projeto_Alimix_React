import React, { useState, useEffect } from 'react';
import "./styles.css";
import Main from '../template/main';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCategoria, fetchTipoMovimentacao, fetchTransacao, fetchUsuario, fetchSaldoMensal, fetchSaldoAtual } from '../controllers/Api';
import { format } from 'date-fns';
import imgCard from "../img/alimixcard.jpg";
import imgLogo from "../img/logo.png";


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

    return (
        <Main>
            <div className='content container-fluid'>
                <div style={{ display: 'grid', justifyContent: 'center', gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <div style={{ gridColumn: '1' }}>
                        <img src={imgLogo} alt="Logo" width="300" height="200" />
                    </div>
                    <div style={{ gridColumn: '2' }}>
                        <img src={imgCard} alt="Imagem do Cartão" width="300" height="200" />
                    </div>
                    <div className='content_button' style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link to="/home">
                            <button className='home_button'>
                                Home
                            </button>
                        </Link>
                        <Link to="/movimentacao">
                            <button className='mov_button'>
                                Movimentações
                            </button>
                        </Link>
                    </div>
                </div>
                <hr />
                <h1 style={{ display: 'flex', justifyContent: 'center' }}>
                    Saldo Atual
                </h1>
                {saldoAtual.map((item, index) => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h2>{item.saldo_atual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                    </div>
                ))}
            </div>
        </Main>

    )
}

export default Home;