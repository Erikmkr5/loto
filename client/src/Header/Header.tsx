
import React from 'react';
import './Header.scss'

interface HeaderProps {
    title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="header">
            <h1>{title}</h1>
        </header>
    );
};

