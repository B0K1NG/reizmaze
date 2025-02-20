import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const getTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        localStorage.setItem('theme', 'dark-theme');
        return 'dark-theme';
    } else {
        return savedTheme;
    }
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getTheme);

    const toggleTheme = () => {
        if (theme === 'dark-theme') {
            setTheme('light-theme');
        } else {
            setTheme('dark-theme');
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };