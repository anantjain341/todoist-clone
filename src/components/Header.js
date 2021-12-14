import React from 'react';
import logo from '../assets/images/todoist logo.png'

function Header(){
    return <header className='header'>
        <nav>
            <div className='logo'>
                <img src={logo} alt='logo' width='28'></img>
            </div> 
        </nav>
    </header>
}
export default Header;