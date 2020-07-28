import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Logo from '../../assets/logo.png'
import {auth} from '../../firebase/utils'

const mapState = ({user}) => ({
  currentUser: user.currentUser
});

const Header = props => {
    const { currentUser } = useSelector(mapState)
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

export default Header;
