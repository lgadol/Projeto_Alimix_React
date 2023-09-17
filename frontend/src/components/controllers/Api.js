export const fetchCategoria = async () => {
    try {
        const response = await fetch('http://localhost:4000/categoria');
        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados de categoria: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchTipoMovimentacao = async () => {
    try {
        const response = await fetch('http://localhost:4000/tipomovimentacao');
        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados de movimentação: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchTransacao = async () => {
    try {
        const response = await fetch('http://localhost:4000/transacao');
        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados de transação: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchUsuario = async () => {
    try {
        const response = await fetch('http://localhost:4000/usuario');
        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados de usuário: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchSaldoMensal = async () => {
    try {
        const response = await fetch('http://localhost:4000/saldomensal');
        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados de saldo mensal: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchSaldoAtual = async () => {
    try {
        const response = await fetch('http://localhost:4000/saldoatual');
        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados de saldo atual: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
