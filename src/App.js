import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import './default.scss'
import {Route, Switch, Redirect} from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'
import {setCurrentUser} from './redux/User/user.actions'

//import hoc
import WithAuth from './hoc/withAuth'

//import layout
import MainLayout from './Layouts/MainLayout'
import HomePageLayout from './Layouts/HomePageLayout'

// import pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Recovery from './pages/Recovery'
import DashBoard from './pages/DashBoard'

const App = (props) =>  {

  const dispatch = useDispatch()

  useEffect(() => {

    const authListener = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await handleUserProfile(userAuth);
      userRef.onSnapshot(snapshot => {
        dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }))
      })
    }      
    dispatch(setCurrentUser(userAuth))
    });
    
    return () => {
    authListener();

    }
  }, [])

    return (
      <div className="App">
       <Switch>
       <Route exact path="/" render={()=>(
            <HomePageLayout >
              <Homepage/>
            </HomePageLayout>
          )}/>
          <Route path="/registration" 
          render={() => (
            <MainLayout >
              <Registration/>
            </MainLayout>
          )}/>
          <Route path="/login" 
              render={() => (
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
            <Route path="/dashboard"
              render={() => (
                <WithAuth>
                 <MainLayout>
                   <DashBoard/>
                 </MainLayout>
                 </WithAuth>
              )}
            />
        </Switch>
      </div>
    );
  
  }

export default App;