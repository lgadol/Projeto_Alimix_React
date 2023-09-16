import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from '../components/pages/Home.js';

export default props => (
    <Routes>
        <Route exact path="/home" element={<Home />} />
    </Routes>
)