import React from 'react'
import './style.scss'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Logo from '../../assets/logo.png'
import {auth} from '../../firebase/utils'

const Header = props => {
    const {currentUser} = props;
    console.log(currentUser)
    return (
        <header className="header">
          <div className="wrap">
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="Klexes LOGO" />
              </Link>
            </div>
    
            <div className="callToActions">
            
              {currentUser && (
                <ul>
                  <li>
                    <Link to="/dashboard">
                      My Account
                  </Link>
                  </li>
                  <li>
                    <span onClick={() => auth.signOut()}>
                      LOGOUT
                    </span>
                  </li>
                </ul>
              )}
    
              {!currentUser && (
                <ul>
                  <li>
                    <Link to="/registration">
                      Register
                  </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      Login
                  </Link>
                  </li>
                </ul>
              )}
    
            </div>
          </div>
        </header>
      );
}

Header.defaultProps = {
    currentUser : null
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Header)
