import React from 'react'
import Men from '../../assets/male.jpg'
import Women from '../../assets/woman.jpg'
import './style.scss'

function index() {
    return (
        <div className="directory">
            <div className="wrap">
            <div className="item"
                style={{
                    backgroundImage: `url(${Women})`
                }}
            >
                <a>
                    Shop Women
                </a>
            </div>
            <div className="item"
                style={{
                    backgroundImage: `url(${Men})`
                }}
            >
                <a>
                    Shop Men
                </a>
            </div>
            </div>
        </div>
    )
}

export default index
