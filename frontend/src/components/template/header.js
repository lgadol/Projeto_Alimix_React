import './header.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default props => {
    const navigate = useNavigate();
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    const [fullScreenTitle, setFullScreenTitle] = React.useState('Tela Cheia');

    const handleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
            setFullScreenTitle('Tela Normal');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
                setFullScreenTitle('Tela Cheia');
            }
        }
    }

    return (
        <header className="header-top d-none d-sm-flex align-items-center">
            <button className={isFullScreen ? 'fa fa-compress' : 'fa fa-arrows-alt'} onClick={handleFullScreen} title={fullScreenTitle}></button>
            <h1 className="mt-5">
                <Link to="/home">
                    <i>Alimix</i>
                </Link>
            </h1>
        </header>
    );
}