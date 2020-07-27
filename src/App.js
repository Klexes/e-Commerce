import React, { Component } from 'react';
import './default.scss'
import {Route, Switch, Redirect} from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'

//import layout
import MainLayout from './Layouts/MainLayout'
import HomePageLayout from './Layouts/HomePageLayout'

// import pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Recovery from './pages/Recovery'

const intialState = {
  currentUser : null
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...intialState
    }
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await handleUserProfile(userAuth);
      userRef.onSnapshot(snapshot => {
        this.setState({
          currentUser : {
            id: snapshot.id,
            ...snapshot.data()
          }
        })
      })
    }      
      this.setState({
        ...intialState
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render(){

    const {currentUser} = this.state;
    return (
      <div className="App">
       <Switch>
       <Route exact path="/" render={()=>(
            <HomePageLayout currentUser={currentUser}>
              <Homepage/>
            </HomePageLayout>
          )}/>
          <Route path="/registration" 
          render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout currentUser={currentUser}>
              <Registration/>
            </MainLayout>
          )}/>
          <Route path="/login" 
              render={() => currentUser? <Redirect to="/"/> : (
              <MainLayout currentUser={currentUser}>
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

export default App;
