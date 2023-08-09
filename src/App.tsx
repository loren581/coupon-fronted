import { ToastContainer } from 'react-toastify'
import './App.css'
import Header from './Components/Layout/Header/Header'
import Main from './Components/Layout/Main/Main'
import Menu from './Components/Layout/Menu/Menu'
import Footer from './Components/Layout/Footer/Footer'
import { useState } from 'react'
import { Theme } from './Models/Theme'

function App() {

    const [theme, setTheme] = useState<Theme>('light-mode');

    const changeTheme = () => {
        setTheme((theme === 'light-mode') ? 'dark-mode' : 'light-mode')
    }

    return (
        <div className={`App ${theme}`}>
            <button className='transparent-bg' onClick={changeTheme}>
                {theme === 'light-mode' ? <span className='big-emoji' >🌚</span> : <span className='big-emoji'>🌝</span>}
            </button>
            <Header />
            <Menu />
            <Main />
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default App
