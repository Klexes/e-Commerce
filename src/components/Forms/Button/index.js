import React from 'react'
import './style.scss'

function index({children, ...otherProps}) {
    return (
        <button className="btn" {...otherProps}>
            {children}
        </button>            
    )
}

export default index
