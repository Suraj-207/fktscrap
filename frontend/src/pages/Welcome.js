import React from 'react'
import './Welcome.css'
import theme from '../shared/UIComponent/theme.png'

const Welcome = () => {
    return (
        <div className="intro">
            <h1>Welcome to <span>FKTSCRAP</span></h1>
            <h3>Search your favourite product and get its review from sites like flipkart.</h3>
            <img
                className="logo"
                src={theme}
                alt="theme"
                />
        </div>
    )
}

export default Welcome
