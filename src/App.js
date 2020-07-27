import React, { Component } from 'react';
import {connect} from 'react-redux'
import './default.scss'
import {Route, Switch, Redirect} from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'
import {setCurrentUser} from './components/redux/User/user.actions'

//import layout
import MainLayout from './Layouts/MainLayout'
import HomePageLayout from './Layouts/HomePageLayout'

// import pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Recovery from './pages/Recovery'

class App extends Component {
  
  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.authListener = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await handleUserProfile(userAuth);
      userRef.onSnapshot(snapshot => {
        setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
      })
    }      
    setCurrentUser(userAuth)
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render(){

    const {currentUser} = this.props;
    return (
      <div className="App">
       <Switch>
       <Route exact path="/" render={()=>(
            <HomePageLayout >
              <Homepage/>
            </HomePageLayout>
          )}/>
          <Route path="/registration" 
          render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout >
              <Registration/>
            </MainLayout>
          )}/>
          <Route path="/login" 
              render={() => currentUser? <Redirect to="/"/> : (
              <MainLayout >
                <Login/>
              </MainLayout>
            )}/>
            <Route path="/recovery"
              render={() => (
                 <MainLayout>
                   <Recovery/>
                 </MainLayout>
              )}
            />
        </Switch>
      </div>
    );
  
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
