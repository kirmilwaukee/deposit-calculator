import React from 'react'
import './HomePage.css'
import HeaderInfo from './HeaderInfo'
import ClientWorkspace from './ClientWorkspace' 

function HomePage() {
    return (
        <div className = 'homepage'>
            <HeaderInfo />
            <ClientWorkspace />
        </div>
    )
}

export default HomePage
