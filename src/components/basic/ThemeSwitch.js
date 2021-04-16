import React from 'react';
import {
    FiSun
} from 'react-icons/fi';
import {
    TiWeatherNight
} from 'react-icons/ti';

const toggle = (new_setting) => {
    localStorage.setItem('theme', new_setting);
    window.location.reload();
};

const ThemeSwitch = () => {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        return (
            <div onClick = {() => toggle('light')}>
                <FiSun /> Switch to light mode
            </div>
        );
    } else {
        return (
            <div onClick = {() => toggle('dark')}>
                <TiWeatherNight /> Switch to dark mode
            </div>
        );
    }
};

export default ThemeSwitch;