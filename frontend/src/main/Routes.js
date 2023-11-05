import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from '../components/pages/Home.js';
import Movimentacao from '../components/pages/Movimentacao.js';

export default props => (
    <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/movimentacao" element={<Movimentacao />} />
    </Routes>
)